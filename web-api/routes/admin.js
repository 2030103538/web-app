const express = require("express");
const router = express.Router();
const Query = require("./../config/dbHelper");

const md5 = require("blueimp-md5");
const md5key = require("./../config/config").md5key;
const jwt = require("jsonwebtoken");

router.post('/reg',(req,res,next)=>{
    const {g_zhanghao,g_mima} = req.body;
    const md5mima = md5(g_mima,md5key);
    if (!g_zhanghao || !g_mima){
        res.json({
            status:0,
            msg:"用户名和密码不能为空"
        });

    }else {
        let sql = `INSERT INTO t_g_guanliyuan(g_zhanghao,g_mima) VALUES (?,?)`;
        let vaules = [g_zhanghao,md5mima];
        Query(sql,vaules).then((result)=>{
            res.json({
                status:result.code,
                mag:result.msg
            })
        }).catch((err)=>{
            res.json({
                status:err.code,
                mag:err.msg
            })
        })
    }

});

router.post('/login',(req,res,next)=>{
   const {g_zhanghao,g_mima} = req.body;
    const md5mima = md5(g_mima,md5key);

   if (!g_zhanghao ||  !g_mima){
       res.json({
           status:0,
           mag:"用户名和密码不能为空"
       });
   } else {
       let sql = `SELECT * FROM t_g_guanliyuan WHERE g_zhanghao = ? AND g_mima = ?`;
       let value = [g_zhanghao,md5mima];
       Query(sql,value).then((val)=>{
           if(val.code === 1){

               const {id,g_zhanghao,g_mima,g_mane,g_img} = val.data[0];

               let userData = {id,g_zhanghao,g_mima};

               const token = jwt.sign(userData,md5key);
               console.log(token);
               console.log(jwt.verify(token,md5key));

               req.session.token = token;

               res.json({
                   status:1,
                   mag:"登录成功",
                   data:{
                       token,
                       g_zhanghao,
                       g_mane,
                       g_img
                   }
               })


           }else {
               res.json({
                   status:0,
                   mag:"登录失败"
               })
           }
       }).catch((err)=>{
           return next(err);
       })
   }

});

router.get("/out",(req,res,next)=>{
    req.session.destroy();
    res.json({
       satus:1,
       msg:'退出登录成功'
    });
});



module.exports = router;