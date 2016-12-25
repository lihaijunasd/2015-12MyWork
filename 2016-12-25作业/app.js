var express = require('express');
var path =require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var app =express();
/*监听函数 也是对象*/
app.set('view engine','html');
app.set('views',path.resolve('views'));
/*'html',require('ejs').__express)  告诉express 是什么类型，通过什么模板来渲染  里面是一个函数，一个Render()*/
app.engine('html',require('ejs').__express);
app.use(express.static(path.resolve('public')));
var user = require('./rotues/user');

app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
            resave :true,/*每次请求的时候都会重新保存session  如果是路过的话，也会强制的修改一次*/
            saveUninitialized:true,/*强制办卡  如果是false 是需要的话就办 不需要就不办了*/
            secret:'zfpx',/*密钥  加密cookie*/
}));

app.use('/user',user);

app.listen(8080,function () {
            console.log('server is success listening 8080')
});