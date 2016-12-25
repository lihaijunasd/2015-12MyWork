var express = require('express');
var fs =require('fs');
var rotuer =express.Router();

// var users=null;
/*怎么判断请求的格式，是json 还是text  还是表单序列化的格式  通过什么类型转换*/
/*content-type 请求体中也有文件的类型*/
/*路由的实例*/
function getFile(fn) {
            fs.readFile('./data.json','utf-8',function (err,data) {
                    try {
                            data=JSON.parse(data)
                    }catch (e){
                                data=[]
                    }
                    if(typeof fn !== 'undefined'){
                                fn(data)
                    }

            })
}
function setFile(data,fn) {
            fs.writeFile('./data.json',JSON.stringify(data),fn)
}

rotuer.get('/signup',function (req,res) {

            res.render('signup',{title:'用户注册',error:req.session.error});
            // res.render('signup',{title:'用户注册',error:''})
});
/*注册*/

rotuer.post('/signup',function (req,res) {
      getFile(function (users) {

                    var user = req.body;
                  var flag=users.find(function (item) {
                              console.log(typeof item.username,typeof user.username );
                              return item.username == user.username && item.process == user.process
                  });
                  console.log(flag);
                  if(flag){
                              req.session.error='用户名重复';
                              res.redirect('/user/signup');
                  }else{
                              users.push(user);

                              setFile(users,function (err) {
                                          if(err)console.log(err);
                                          res.redirect('/user/signin');
                              });



                  }


        });








});

rotuer.get('/signin',function (req,res) {
            res.render('signin',{title:'用户登录',sum:req.session.sum})
});
rotuer.post('/signin',function (req,res) {
            getFile(function (users) {
                        var user = req.body;
                        var exisUser= users.find(function (item) {
                                    return item.username == user.username && item.process == user.process
                        });
                        if(exisUser){
                                    res.redirect('/user/welcome')
                        }else {
                                    req.session.sum='用户或者密码错误';
                                    res.redirect('/user/signin');

                        }
            })

});
/*登录*/
rotuer.get('/welcome',function (req,res) {
            res.render('welcome',{title:'欢迎'})
});
/*欢迎*/
module.exports=rotuer;