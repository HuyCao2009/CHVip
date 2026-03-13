require('dotenv').config();

const cors = require('cors');
const express = require('express');
const http = require('http');
const Telegram = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('mongoose-long')(mongoose);

const app = express();
const server = http.createServer(app);

// Websocket
require('express-ws')(app, server);

// ================= TELEGRAM =================
const TelegramToken = process.env.TELEGRAM_TOKEN || '6639702588:AAHuRiT2u5MuwWVazlfzu9CHDMhp-l_-thA';
const TelegramBot = new Telegram(TelegramToken, { polling: false });

// ================= CORS =================
app.use(cors({
origin: '*',
optionsSuccessStatus: 200
}));

// ================= DATABASE =================
const configDB = require('./config/database');

mongoose.connect(configDB.url, configDB.options)
.then(() => {
console.log("MongoDB connected");
})
.catch(err => {
console.log("MongoDB error:", err);
});

// ================= ADMIN =================
require('./config/admin');

// ================= MIDDLEWARE =================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

// ================= VIEW =================
app.set('view engine', 'ejs');
app.set('views', './views');

// ================= STATIC =================
app.use(express.static('public'));

// ================= PORT =================
const PORT = process.env.PORT || 3000;

// ================= SOCKET SERVER =================
const redT = app.get('wss');

process.redT = redT;
redT.telegram = TelegramBot;

global['redT'] = redT;
global['userOnline'] = 0;

// ================= SOCKET FUNCTIONS =================
require('./app/Helpers/socketUser')(redT);

// ================= ROUTERS =================
require('./routerHttp')(app, redT);
require('./routerCMS')(app, redT);
require('./routerSocket')(app, redT);

// ================= GAME CRON =================
require('./app/Cron/taixiu')(redT);
require('./app/Cron/baucua')(redT);

// ================= OTHER CRON =================
require('./config/cron')();
require('./config/crontextchatdata')();
require('./config/cronchattx')(redT);

// ================= TELEGRAM =================
require('./app/Telegram/Telegram')(redT);

// ================= START SERVER =================
server.listen(PORT, '0.0.0.0', () => {
console.log("Server running on port", PORT);
});
