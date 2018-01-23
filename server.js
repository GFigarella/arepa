// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

//set up express
var app = express();
var port = process.env.PORT || 3000;

// Parse application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//connect to the DB
var mysql = require("mysql");
var connection;
if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else{
  var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "eat_da_arepa_db"
  });
}

connection.connect(function(err) {
if (err) {
    console.error("error connecting: " + err.stack);
    return;
}

console.log("connected as id " + connection.threadId);
});


//route for the home directory or 
app.get("/", function(req, res) {
    connection.query("SELECT * FROM arepas;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }
  
      res.render("index", { arepas: data });
    });
});

// Create a new arepa
app.post("/newArepa", function(req, res) {
    connection.query("INSERT INTO arepas (filling) VALUES (?)", [req.body.newArepa], function(err, result) {
      if (err) {
        return res.status(500).end();
      }
  

      console.log("test");
      res.redirect("/")
      console.log({ id: result.insertId });
    });
  });

  //move devoured arepas to a separate div in the site
  app.post("/arepaDevour", function (req, res){
    console.log("It has been devoured!");
    connection.query("UPDATE arepas SET devoured = 1 WHERE id = ?", [req.body.arepaDevour], function(err, data){
      res.redirect("/");
    });
  })


app.listen(port, function() {
console.log("listening on port", port);
});