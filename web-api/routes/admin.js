const express = require("express");
const router = express.Router();
const Query = require("./../config/dbHelper");

const md5 = require("blueimp-md5");
const md5key = require("./../config/config").md5key;

router.post('/reg',(req,res,next)=>{
    const {g_zhanghao,g_mima} = req.body;
    const md5mima = md5(g_mima,md5key);
    if (!g_zhanghao || !g_mima){
        res.json({
            status:0,
            mag:"用户名和密码不能为空"
        });

    }else {
        let sql = `INSERT INTO t_g_guanliyuan(g_zhanghao,g_mima) VALUES (?,?)`;
        let vaules = [g_zhanghao,md5mima];
        Query(sql,vaules).then((result)=>{
            res.json({
                status:result.code,
                mag:result.mag
            })
        }).catch((err)=>{
            res.json({
                status:err.code,
                mag:err.mag
            })
        })
    }

});

module.exports = router;