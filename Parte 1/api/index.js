const express = require("express");
const bodyParser = require ("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require ("passport");
const githubStratergy = require("passport-github2").Strategy;
const axios = require("axios");
const albumRoutes = require('./routes/albumRoutes');


const artistaRoutes = require('./routes/artistaRoutes');
const musicaRoutes = require('./routes/musicaRoutes');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = 3009;
const GITHUB_CLIENT_ID = "b0bca2d4e82e8dadc5f3"; // PLEASE CREATE YOUR OWN APPLICATION AT GITHUB
const GITHUB_CLIENT_SECRET = "f25dad5a9a28f83009191ce56c409a4ac30cc7c8"; // PLEASE CREATE YOUR OWN APPLICATION AT GITHUB
const GITHUB_CALLBACK_URI = "http://localhost:3009/auth/github/callback";

app.use(cors({
    origin: true // Allow requests from only this origin
  }));

passport.serializeUser(function(user,done){done(null, user);});
passport.deserializeUser(function(user,done){done(null, user);});


const bodyParserOptions = {extended: true};
const passportOptions = {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URI
};
const sessionOption = {
    secret: "my top secret key",
    resave: false,
    saveUninitialized: true
}



passport.use(
    new githubStratergy(
        passportOptions,
        function (accessToken, refreshToken, profile, done){
            profile.token = accessToken;
            return done(null, profile);
        }
    ));

const auth = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

const swaggerDefinition = { 
    openapi: "3.0.0",
    info: {
    title: "Musicas",
    version: "1.0.0",
    description: "OAuth2.0 protected API",
    contact: { name: "Musicas" },
    },
    servers: [{ url: "http://localhost:" + port }],
    
};

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
}

const options = {
    swaggerDefinition,
    apis: ["./docs/**/*.yaml"],
    };
    

const swaggerSpec = swaggerJSDoc(options);
    app.get("/docs/swagger.json", (req, res) => res.json(swaggerSpec));
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(session({
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());




app.use(bodyParser.json());
app.use(bodyParser.urlencoded(bodyParserOptions));



app.get('/album',  albumRoutes);
app.get('/album/:id',  albumRoutes);
app.put('/album/:id',  albumRoutes);
app.post('/album',  albumRoutes);
app.delete('/album/:id', albumRoutes);

app.get('/artista',  artistaRoutes);
app.get('/artista/:id', artistaRoutes);
app.put('/artista/:id',  artistaRoutes);
app.post('/artista',  artistaRoutes);
app.delete('/artista/:id', artistaRoutes);



app.get('/musica',musicaRoutes);
app.get('/musica/:id', musicaRoutes);
app.put('/musica/:id', musicaRoutes);
app.post('/musica', musicaRoutes);
app.delete('/musica/:id', musicaRoutes);




app.get('/protected', ensureAuthenticated, (req, res) => {
    res.send('Esta é uma página protegida');
  });



app.use('/api', musicaRoutes);

app.get("/", auth , function (req, res){
    res.sendFile(__dirname+"/public/protected.html");
});
app.get("/login", function(req, res){
    res.sendFile(__dirname+"/public/login.html");
    
});
app.get("/logout", function(req,res){
    req.logout(function(err) {
        if (err) { 
            console.log(err); 
        }
        res.redirect("/login");
    });
});
app.get("/auth/github", 
    passport.authenticate("github", {scope: ["user.email"]}), 
    function(req, res){}
);
app.get("/auth/github/callback", 
    passport.authenticate("github", {failureRedirect: "/login"}),
    function(req, res){
        res.redirect("/");
    }
);
app.get("/me", auth, function(req,res){
    res.json(req.user);
});

app.get("/githubme", auth, function(req, res){
    const token = req.user.token;
    axios.get("https://api.github.com/user", {headers: {Authorization: `Bearer ${token}`}})
    .then(function(resp){
        console.log(resp);
        res.json(resp.data);
    })
    .catch(function(err){
        res.json(err);
    });
});



app.use(express.static(__dirname+"/public"));



(async () => {
    const database = require('./db');
    const Album = require('./models/album');
    const Artista = require('./models/artista');
    const Musica = require('./models/musica');
    await database.sync(/*{force:true}*/);
})();




//start server
app.listen(port, function(){console.log(`App running on http://localhost:${port}`)})






