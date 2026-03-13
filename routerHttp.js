let mobile = require('is-mobile');
let bank   = require('./routes/bank');

module.exports = function(app, redT) {

	// Home
	app.get('/', function(req, res) {
		if (mobile({ua:req})) {
			return res.render('index_mobile');
		} else {
			return res.render('index');
		}
	});

	// Android
	app.get('/download/android', function(req, res) {
		return res.render('download/android');
	});

	// Admin
	app.get('/68ClubA/', function(req, res) {
		return res.render('admin');
	});

	// Fanpage
	app.get('/fanpage/', function(req, res) {
		return require('./routes/fanpage/redirect')(res);
	});

	// Help IOS
	app.get('/help/ios/', function(req, res) {
		return res.render('help/ios');
	});

	// Telegram
	app.get('/telegram/', function(req, res) {
		return require('./routes/telegram/redirect')(res);
	});

	// Callback nạp thẻ
	app.post('/c40e7445f27f71a00365b36588d60e70', function(req, res) {
        return require('./app/Controllers/shop/nap_the_callback')(req,res);
    });

	// Momo callback
	app.get('/momocallback', function(req, res) {
        return require('./app/Controllers/shop/momocallback')(req,res);
    });

	// Bank callback
	app.get('/bankcallback', function(req, res) {
        return require('./app/Controllers/shop/bankcallback')(req,res);
    });

	app.get('/autobankz', function(req, res) {
        return require('./app/Controllers/shop/autocallback')(req,res);
    });

	require('./routes/api')(app, redT);
};
