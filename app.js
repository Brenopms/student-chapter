var express          = require('express');
var exphbs           = require('express-handlebars');
var bodyParser       = require('body-parser');
var cookieParser     = require('cookie-parser');
var expressSanitizer = require('express-sanitizer');
var mongoose         = require('mongoose');
var methodOverride   = require('method-override');
var passport         = require('passport');
var LocalStrategy    = require('passport-local');
var flash            = require('express-flash');
var multer           = require('multer');
var crypto           = require('crypto');
var i18n             = require('i18n');
var seedDB           = require("./seeds");
var app              = express();

/**
 * Routers
 */
var indexRoutes   = require('./routes/index');
var coursesRoutes = require('./routes/courses');
var contactRoutes = require('./routes/contact');
var adminRoutes   = require('./routes/admin');

/**
 * Database Setup
 */
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongo:27017/project_db_name", {
	keepAlive: true,
	reconnectTries: Number.MAX_VALUE,
	useMongoClient: true
});

/**
 * App Configuration
 */
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	helpers: require("./public/js/helpers.js").helpers,
	partialsDir: 'views/partials/'
}));
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

/**
 * Database Models
 */
var User = require('./models/user');

/**
 * Passport Configuration
 */
app.use(require("express-session")({
	secret: "Custom Secret Seed Text for Your App",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(cookieParser('secretString'));
app.use(flash());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

/**
 * Database Seeding
 */
seedDB();

/**
 * Routes Setup
 */
app.use("/", indexRoutes);
app.use("/courses", coursesRoutes);
app.use("/contact", contactRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, function () {
	console.log('UFMG Student Chapter App listening on port 3000!');
});
