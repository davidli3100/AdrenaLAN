const express 		= require("express"),
	  app			= express(),
	  path 			= require("path");

// ROUTES
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/', '/index.html'));
});

app.get("/game", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/', '/game.html'));
});


app.listen(3000, function() {
	console.log("Server has started at PORT: 3000");
});