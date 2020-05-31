const express = require("express");
const router = express.Router();
const Query = require("./../config/dbHelper");
const { lifejob_img } = require('./../contreoller/managerApi/uploadimg');

router.post('/lifejob_img',lifejob_img.single('l_img'),(req,res,next)=>{
    res.json({
        status:0,
        msg:'上传成功',
        data:{
            g_img:"/images/lifejob/" + req.file.filename
        }
    })
});

router.get('/lifejob_jiayu',(req,res,next)=>{
    const sql = `SELECT * FROM t_z_jiayu`;
    Query(sql).then((data)=>{
        res.json({
            status:data.code,
            data:data.data
        })
    }).catch((err)=>{
        res.json({
            status:err.code,
            data:err.data
        })
    })

});

router.get('/lifejob_peixun',(req,res,next)=>{
    const sql = `SELECT * FROM t_z_peixun`;
    Query(sql).then((data)=>{
        res.json({
            status:data.code,
            data:data.data
        })
    }).catch((err)=>{
        res.json({
            status:err.code,
            data:err.data
        })
    })

});

router.post('/lifejob',(req,res,next)=>{
    const { z_name, z_img,z_jiage, z_zuozhe, z_time,z_neir,z_jiaoyuid, z_jiaoyuan,z_focusimg } = req.body;

    const sql = `INSERT INTO t_z_zhichang ( z_name, z_img,z_jiage, z_zuozhe, z_time,z_neir,z_jiaoyuid, z_jiayuanid,z_focusimg)
  VALUES (?,?,?,?,?,?,?,?,?);`;
    const values = [z_name, z_img,z_jiage, z_zuozhe, z_time,z_neir,z_jiaoyuid, z_jiaoyuan,z_focusimg] ;
    console.log(values);
    Query(sql,values).then((data)=>{
        res.json({
            status:data.code,
            msg:'活动添加成功'
        })
    }).catch((err)=>{
        res.json({
            status:err.code,
            msg:'活动添加失败'
        })
    })

});

router.get('/lifejob_list',(req,res,next)=>{
    let pageNum = req.query.page_num || 1;
    let pageSize = req.query.page_size || 4;

    let sql = `SELECT t_z_zhichang.*,t_z_jiayu.jiayuan,t_z_peixun.peixun
     FROM t_z_zhichang LEFT JOIN t_z_jiayu ON t_z_zhichang.z_jiaoyuid = t_z_jiayu.id
      LEFT JOIN t_z_peixun ON t_z_zhichang.z_jiayuanid = t_z_peixun.id 
      limit ${(pageNum-1)*pageSize},${pageSize}`;

    let sql1 = `SELECT COUNT(*) as counts FROM t_z_zhichang`;

    Query(sql1).then((val)=>{
        Query(sql).then((val1)=>{
            res.json({
                status:val1.code,
                msg:'获取活动成功',
                data:{
                    counts:val.data,
                    list:val1.data
                }
            })
        })
    }).catch((err)=>{
        res.json({
            status:err.code,
            msg:'获取活动失败',
        })
    })
});

router.get('/lifejob_focus',(req,res,next)=>{
    let id = req.query.id;
    let focus = req.query.focus;

    let sql = `UPDATE t_z_zhichang SET z_focus=? WHERE id=?`;
    let value = [focus,id];

    Query(sql,value).then((val)=>{
        res.json({
            status:1,
            msg:'修改成功'
        })
    }).catch((err)=>{
        res.json({
            status:0,
            msg:'修改失败'
        })
    })
});

router.get('/lifejob_shanc',(req,res,next)=>{
    let id = req.query.id;

    let sql = `DELETE FROM t_z_zhichang WHERE id=?`;
    let value = [id];

    Query(sql,value).then((val)=>{
        res.json({
            status:0,
            msg:'删除成功'
        })
    }).catch((err)=>{
        res.json({
            status:1,
            msg:'删除失败'
        })
    })
});

router.post('/lifejob_xiugai',(req,res,next)=>{
    const { id, z_name, z_img,z_jiage, z_zuozhe, z_time,z_neir,z_jiaoyuid, z_jiaoyuan,z_focusimg } = req.body;
    const sql = `UPDATE t_z_zhichang SET z_name=?, z_img=?,  z_jiage=?, z_zuozhe=?, z_time=?, z_neir=?,z_jiaoyuid=?, z_jiayuanid=?,
     z_focusimg=? WHERE id = ?; `;
    const values =[z_name, z_img,z_jiage, z_zuozhe, z_time,z_neir,z_jiaoyuid, z_jiaoyuan,z_focusimg,id] ;
    Query(sql,values).then((data)=>{
        res.json({
            status:data.code,
            msg:'活动修改成功'
        })
    }).catch((err)=>{
        res.json({
            status:err.code,
            msg:'活动修改失败'
        })
    })

});

module.exports  = router;