//Importation
const mysql = require("mysql");
const express = require('express');
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");


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
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "userID",                              //nom du cookie que l'on crée
    secret: "secret du groupe !",
    resave: false,                              // sauvegarde un objet cookie
    saveUninitialized: false,                   // sauvegarder une session [seulement quand il ya nouvelle modif (false)/ tout le temps (true)]
    cookie: {expires: 1000 * 60 * 60 * 24},
}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("\nrequete recu !!!")
    next();
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

app.post('/login', express.urlencoded({extended: false}), (req, res) => {
    const event = req.body;
    let responseHasBeenSent = false; // Indicateur pour savoir si une réponse a déjà été envoyée

    sql = "SELECT * FROM utilisateurs WHERE Nom_Utilisateur = ?";
    conn.query(sql, event.username, (err, result) => {
        if (err) {
            if (!responseHasBeenSent) {
                responseHasBeenSent = true;
                res.send({err: err});
            }
            return;
        }

        console.log(result)
        if (result != undefined ) {
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

                        //3 save the session before redirection to ensure page
                        // load does not happen before session is saved
                        req.session.save((e) => {
                            if (e) console.log(e);
                            console.log(req.session.user);
                            if (!responseHasBeenSent) {
                                responseHasBeenSent = true;
                                res.json("Un utilisateur est connecté");
                            }
                        })
                    })
                } else {
                    if (!responseHasBeenSent) {
                        responseHasBeenSent = true;
                        res.status(502).send({msg: "Mauvaise authentication du nom d'utilisateur ou du mot de passe !"})
                    }
                }
            });
        } else {
            if (!responseHasBeenSent) {
                responseHasBeenSent = true;
                res.status(502).send({msg: "Aucun utilisateur trouvé !"})
            }
        }
    });
});
app.get('/login', (req, res) => {
    if (req.session.user) {
        return res.send({estConnecte: true, utilisateur: req.session.user[0]});
    } else {
        return res.send({estConnecte: false});
    }
});

// SERVER ON
const server = app.listen(3006, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log("TP4 Samba-Taha http://%s:%s", host, port)
});