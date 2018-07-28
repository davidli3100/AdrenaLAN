const express 		= require("express"),
	  app			= express();

// ROUTES
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, '/views/', '/index.html'));
});


app.listen(3000, function() {
	console.log("Server has started at PORT: 3000");
});