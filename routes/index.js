var express = require("express");
var session = require("express-session");
var router = express.Router();
var bcrypt = require("bcrypt");
var Users = require("../models/users");
var question = require("../models/QuestionReponse");
var security = require("../middlewares/security");
var mongoose = require('mongoose');


router.get("/", /*security.checkIfUserConnected,*/ function(req, res, next) {
    res.render("index")
});

//router.post("/home",security.checkIfUserNotConnected, async(req, res, next) {
// res.render("home");s
//})
router.get("/home", async(req, res) => {

    var dataPublications = await question.find().sort({ datetime: -1 });
    res.locals.QRCollections = dataPublications;
    console.log(dataPublications)

    if (req.query.error)
        res.render("home", { error: req.query.error })
    else
        res.render("home")
});
router.get("/register", /*security.checkIfUserConnected,*/ function(req, res, next) {
    res.render("register");
});
router.get("/question", function(req, res, next) {
    res.render("question");
});
// creer une route pour la confirmation des données de l'utilisateur
router.post("/registerUser", /*security.checkIfUserConnected, */ async(req, res, next) => {
    //req.body permet d'acceder aux objects de type json
    var postData = req.body;
    if (
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
    }
    console.log(postData);

})


router.post('/homelogin', async(req, res) => {
    var loginData = req.body
        //if(loginData.email.trim() !="" && loginData.password.trim() !=""){
    var userInfos = await Users.findOne({ mail: loginData.email })
    console.log(loginData);
    console.log(userInfos)
    if (userInfos != null) {
        //var passwordCrypt = bcrypt.hashSync(loginData.password, 3);
        console.log("login password " + loginData.password)

        // if(userInfos.password == passwordCrypt){
        if (userInfos.password == loginData.password) {
            res.redirect('home')
        } else {
            res.locals = { error: "Password error !" }
            res.render("index")
        }
    } else {
        res.locals = { error: "This address does not exists !" }
        res.render("index")
    }

})


router.post("/your_question", async(req, res) => {

    var postData = req.body;


    if (
        postData.texteQ != "" &&
        postData.category != "" &&
        postData.tags != "" &&
        postData.Reponses != "") {

        donnee = new question({
            tags: postData.tags,
            category: postData.category,
            texteQ: postData.texteQ,
            datetime: new Date(),
            // user: req.session.user._id,
            //Reponses: array[{
            // texteR:postData.texteR,

        });
        //2.2 - INSERT INTO DATABASE
        await donnee.save();
        //3 - GO BACK TO HOME PAGE
        res.redirect("home")
    } else {
        res.locals = { error: "Tous les champs sont obligation" }
        res.render("question")
    }

});

router.get("/search", async(req, res) => {
    var dataPublications = await question.find({ 'tags': { '$regex': req.query.search } });
    res.locals.QRCollections = dataPublications;
    res.render("home");
});

router.get("/html", async(req, res) => {
    var dataPublications = await question.find({ "category": "html" })
    res.locals.html = dataPublications;
    console.log(dataPublications)

    res.render("html")

});

router.get("/java", async(req, res) => {
    var dataPublications = await question.find({ "category": "java" })
    res.locals.java = dataPublications;
    console.log(dataPublications)

    res.render("java")

});

router.get("/php", async(req, res) => {
    var dataPublications = await question.find({ "category": "php" })
    res.locals.php = dataPublications;
    console.log(dataPublications)

    res.render("php")

});

router.get("/css", async(req, res) => {
    var dataPublications = await question.find({ "category": "css" })
    res.locals.css = dataPublications;
    console.log(dataPublications)

    res.render("css")

});



router.post('/Reponses', async(req, res) => {

    //console.log(req.body.questionId);


    // var dataPublications = await question.find({}).sort({ datetime: -1 });
    //res.locals.QRCollections = dataPublications;

    var dataPublications = await question.findOne({ _id: req.body.questionId }).sort({ datetime: -1 });;
    res.locals.QRCollections = dataPublications;
    //console.log('-----contenu de reponses------')
    //console.log(reponse)
    res.render("Repoonse")
})





router.get("/logout", (req, res) => {

    req.session.destroy();
    res.render("index")
})




module.exports = router;