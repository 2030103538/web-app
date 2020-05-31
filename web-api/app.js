var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入api
const adminRoutes = require("./routes/admin");
const zhiboRoutes = require("./routes/zhibo");
const activitiesRoutes = require("./routes/activities");
const lifejobRoutes = require("./routes/lifejob");
//数据token持久化
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbdata = require("./config/config").database;
var sessionStore = new MySQLStore({
  host: dbdata.HOST,
  port: dbdata.PORT,
  user: dbdata.USER,
  password: dbdata.PASSWORD,
  database: dbdata.DATABASE
});

//权限
var auth = require('./middleWare/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  key:"itback",
  secret:"itback",//加密字符串
  resave:false,//是否强制保存session，即使没有变化
  saveUninitialized:true,
  cookie:{maxAge:24*3600*1000},
  rolling:true,//每次重置
  store:sessionStore //创建的表，数据储存表
}));

//app.use(auth);

app.use("/api/auth/admin",adminRoutes);
app.use("/api/auth/live",zhiboRoutes);
app.use("/api/auth/activities",activitiesRoutes);
app.use("/api/auth/lifejob",lifejobRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
