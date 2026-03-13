let users = require('./socketUsers');
let admin = require('./socketAdmin');

module.exports = function(app, redT) {

	app.ws('/client', function(ws, req) {

		try{
			users(ws, redT);
		}catch(e){
			console.error("Socket user error:", e);
		}

		ws.on('error', function(err){
			console.error("WS client error:", err);
		});

		ws.on('close', function(){
			console.log("Client disconnected");
		});
	});

	app.ws('/vn1102', function(ws, req) {

		try{
			admin(ws, redT);
		}catch(e){
			console.error("Socket admin error:", e);
		}

		ws.on('error', function(err){
			console.error("WS admin error:", err);
		});

		ws.on('close', function(){
			console.log("Admin disconnected");
		});
	});

};
