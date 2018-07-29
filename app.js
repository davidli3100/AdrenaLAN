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

app.get("/levelZero", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/levelZero', '/game.html'));
});

// Level One
app.get("/levelOne", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/levelOne', '/game.html'));
});
app.get("/paywallOne", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/levelOne', '/paywall.html'));
});

// Level Two
app.get("/levelTwo", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/levelTwo', '/game.html'));
});
app.get("/paywallTwo", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/levelTwo', '/paywall.html'));
});


app.listen(3000, function() {
	console.log("Server has started at PORT: 3000");
});