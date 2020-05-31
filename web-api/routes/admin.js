const express = require("express");
const router = express.Router();
const Query = require("./../config/dbHelper");

const md5 = require("blueimp-md5");
const md5key = require("./../config/config").md5key;
const jwt = require("jsonwebtoken");
const { admin_img } = require('./../contreoller/managerApi/uploadimg');

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
    // console.log(g_zhanghao);
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
           console.log(val);
           if(val.code === 1){

               // console.log(val);
               // console.log(val.data);
               // console.log(val.data[0]);
               const {id,g_zhanghao,g_mima,g_neme,g_img} = val.data[0];

               let userData = {id,g_zhanghao,g_mima,g_neme};

               const token = jwt.sign(userData,md5key);
               // console.log(token);
               // console.log(jwt.verify(token,md5key));

               req.session.token = token;

               res.json({
                   status:1,
                   mag:"登录成功",
                   data:{
                       token,
                       g_zhanghao,
                       g_neme,
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

router.post('/upload_img',admin_img.single('g_img'),(req,res,next)=>{
    res.json({
        status:0,
        msg:'头像上传成功',
        data:{
            g_img:"/images/admin/" +req.file.filename
        }
    })
});

router.post('/edit',(req,res,next)=>{
    const { token, g_neme, g_img } = req.body;
    const userdata = jwt.verify(token,md5key);
    console.log(userdata);
    const sql = `UPDATE t_g_guanliyuan SET g_neme=?, g_img=? WHERE id=?;`;
    const { id,g_zhanghao,g_mima } = userdata;

    let userData = {id,g_zhanghao,g_mima,g_neme};
    const gtoken = jwt.sign(userData,md5key);
    const values = [g_neme,g_img,id];
    Query(sql,values).then((val)=>{
        console.log(g_neme);
        console.log(val);
        res.json({
            status:0,
            msg:'管理员信息更新成功',
            data:{
                token:gtoken,
                g_neme,
                g_img,
                g_zhanghao
            }
        })
    }).catch((err)=>{
        return next(err);
    })
});

router.post('/old_pwd',(req,res,next)=>{
    const { token, p_mima, p_old } = req.body;
    const userdata = jwt.verify(token,md5key);
    const { id, g_mima } = userdata;
    const p_mimamd5 = md5(p_mima,md5key);
    const p_oldmd5 = md5(p_old,md5key);
    if (g_mima === p_oldmd5){
        const sql = `UPDATE t_g_guanliyuan SET g_mima=? WHERE id=?;`;
        const values = [p_mimamd5,id];
        Query(sql,values).then((val)=>{
            req.session.destroy();
            res.json({
                status:0,
                msg:'修改成功'
            })
        }).catch((err)=>{
            res.json({
                status:1,
                msg:'修改失败'
            })
        })
    } else {
        res.json({
            status:0,
            msg:'密码错误'
        })
    }
});


module.exports = router;