var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var Users = require("../models/users");
//var security_md = require("../middlewares/security");


router.get("/", function(req, res, next) {
    res.render("index")
});
//router.post("/home", function(req, res, next) {
// res.render("home");
//})
router.get("/register", function(req, res, next) {
    res.render("register");
});
router.get("/question", function(req, res, next) {
    res.render("question");
});
// creer une route pour la confirmation des données de l'utilisateur
router.post("/registerUser", async(req, res, next) => {
    //req.body permet d'acceder aux objects de type json
    var postData = req.body;
    /* if (
         postData.name.trim() != "" &&
         postData.email.trim() != "" &&
         postData.password != ""
     ) {
         //verification du mail
         var ifEmailExists = await Users.findOne({ mail: postData.email });
         if (ifEmailExists == null) {
             //confirmation du password
             if (postData.password == postData.confirmation) {
                 //pourcripter le mot de passe
                 // var password_cript = bcrypt.hashSync(postData.password, 3);
                 //les données d l'utulisateur
                 var User = new Users({
                     mail: postData.email,
                     name: postData.name,
                     password: postData.password
                 });
                 //sauvegarde des données utilisateur
                 await User.save();
                 // retoura la page registerConfirmation
                 res.render("registreConfirmation");
                 //sinon renvoie moi a lapage register  et affiche moi les  erruer
             } else {
                 res.render("register", { error: "Password confirmation error" });
             }
         } else {
             res.render("register", { error: "Email already exists" });
         }
     } else {
         res.render("register", { error: "All fields are required" });
     }*/
    console.log(postData)
    res.render('index')
})

router.post("/home", async(req, res, next) => {

    var postData = req.body;


    var userData = await Users.findOne({ "mail": postData.email })


    console.log(postData);
    console.log(userData);
    res.render("home")

    /*
        if (userData != null) {

            var checkPassword = bcrypt.compareSync(userInfos.password, userData.password);
            if (checkPassword) {

                req.session.users = userData

                res.render("home")
            } else {
                res.locals = { error: "Password error !" }
                res.render("index")
            }
        } else {
            res.locals = { error: "This address does not exists !" }
            res.render("index")
        }*/


})






router.get("/logout", (req, res) => {
    //DESTROY SESSIONS
    //req.session.destroy();
    res.render("index")
})




module.exports = router;