//Importation
const mysql = require("mysql");
const express = require('express');
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const otpGenerator = require('otp-generator'); // Bibliothèque pour générer des codes OTP


//SQL
let sql;
const saltRounds = 10;
const connString = "mysql://user-tp4:AVN_nM31pOklQMfuMULHoEv@mysql-tp2-sm-tr-monptitdoigt29-4875.aivencloud.com:16151/tp2bd?ssl-mode=REQUIRED";
let conn = mysql.createConnection(connString);

// Paramètres serveur
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: "userID",                              //nom du cookie que l'on crée
    secret: "secret du groupe !",
    resave: false,                              // sauvegarde un objet cookie
    saveUninitialized: false,                   // sauvegarder une session [seulement quand il ya nouvelle modif (false)/ tout le temps (true)]
    cookie: { expires: 1000 * 60 * 60 * 24 },
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("\nrequete recu !!!")
    next();
});

// 2FA
const code2Facteur = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
});


app.get('/ips', (req, res)=>{
    fs.readFile( "../src/Component"+"ip.txt",'utf8', (err,data) => {
        const ips = JSON.parse( data );
        console.log( ips );
        res.end( data);
    })
});


/****enregistrer utilisateur*****/
app.post('/enregistrer', (req, res) => {
    const event = req.body;

    sql = "INSERT INTO utilisateurs (Nom_Utilisateur, Mot_De_Passe) VALUES (?,?);";
    bcrypt.hash(event.password, saltRounds, (er, hash) => {
        if (er) console.log(er);

        conn.query(sql, [event.username, hash], (err, result) => {
            if (err) throw err;
            res.status(201).send(result);
        });
    });

});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
    const event = req.body;
    let responseHasBeenSent = false; // Indicateur pour savoir si une réponse a déjà été envoyée

    sql = "SELECT * FROM utilisateurs WHERE Nom_Utilisateur = ?";
    conn.query(sql, event.username, (err, result) => {
        if (err) {
            if (!responseHasBeenSent) {
                responseHasBeenSent = true;
                res.send({ err: err });
            }
            return;
        }

        console.log(result)
        if (result != undefined) {
            bcrypt.compare(event.password, result[0].Mot_De_Passe, (error, response) => {
                console.log("Mot de Passe compare: ", response);
                if (response) {
                    // https://expressjs.com/en/resources/middleware/session.html
                    //1 - regenerate the session, which is good practice to help
                    // guard against forms of session fixation
                    req.session.regenerate((er) => {
                        if (er) throw er;

                        //2 - store user information in session, typically a user id
                        req.session.user = result;

                        //3 - generer le code à 2 facteurs
                        const deuxfacteur = code2Facteur.toString()

                        // 4 Enregistrer le code 2FA
                        sql = "INSERT INTO otp (otp,horodate) values (?,?);";
                        conn.query(sql, [deuxfacteur, new Date()], (err, result) => {
                            if (err) throw err;
                            console.log("Un code 2FA à été enregistré");
                        })

                        //4 save the session before redirection to ensure page
                        // load does not happen before session is saved
                        req.session.save((e) => {
                            if (e) console.log(e);
                            console.log(req.session.user);
                            if (!responseHasBeenSent) {
                                responseHasBeenSent = true;
                                res.json("Un utilisateur est connecté ! \n le code 2FA est : " + deuxfacteur);
                            }
                        })
                    })
                } else {
                    if (!responseHasBeenSent) {
                        responseHasBeenSent = true;
                        res.status(502).send({ msg: "Mauvaise authentication du nom d'utilisateur ou du mot de passe !" })
                    }
                }
            });
        } else {
            if (!responseHasBeenSent) {
                responseHasBeenSent = true;
                res.status(502).send({ msg: "Aucun utilisateur trouvé !" })
            }
        }
    });
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        return res.send({ estConnecte: true, utilisateur: req.session.user[0] });
    } else {
        return res.send({ estConnecte: false });
    }
});

//////////////////// 2FA ////////////////////////////////////
app.post('/verify-two-factor', (req, res) => {
    const userId = req.session.userId; // Supposons que l'identifiant de l'utilisateur est stocké dans la session
 
    // 1 - Supprimer les codes 2FA après 15 minutes
    sql = "SELECT * FROM otp;";
    conn.query(sql, (err, result) => {
        if (err) throw err;

        for(o = 0 ; o< result.length; o++){
            const minutes =  Math.abs((new Date().getTime() - new Date(result[o].horodate).getTime())/1000 /60) %60
            console.log(minutes)
            const sql2 = "DELETE FROM otp WHERE otp = ?"; 

            if(minutes >= 15 || minutes < 0){
                conn.query(sql2, [result[o].otp],(errs, results) => {
                    if (errs) throw errs;
                })
            }
        }
    })

    // 2 -Chercher le code 2FA enregistré
    input2FA = req.body.twoFactorPass
    twoFactorPass = undefined;
    sql = "SELECT * FROM otp WHERE otp = ?";
    conn.query(sql, input2FA, (err, result) => {
        if (err) throw err;
        twoFactorPass = result[0] ;
        console.log(result )
        // Récupérer le code OTP associé à l'utilisateur depuis la base de données ou le cache
        if (twoFactorPass) {
    
    
    
    
            res.json({ success: true });
        } else {
            res.json({ success: false, msg: 'Code à deux facteurs invalide' });
        }

    })



    
});


// SERVER ON
const server = app.listen(3006, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("TP4 Samba-Taha http://%s:%s", host, port)
});