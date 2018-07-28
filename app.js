const express 		= require("express"),
	  app			= express(),
	  path 			= require("path");

app.use(express.static(__dirname + "/assets"));
app.use(express.static(__dirname + "/games"));
app.use(express.static(__dirname + "/public"));
// ROUTES
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/', '/index.html'));
});

// Level One
app.get("/levelOne", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/levelOne', '/game.html'));
});
app.get("/paywallOne", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/levelOne', '/paywall.html'));
});


app.listen(3000, function() {
	console.log("Server has started at PORT: 3000");
});