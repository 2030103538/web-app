const express = require("express");
const router = express.Router();
const Query = require("./../config/dbHelper");
const { activities_img } = require('./../contreoller/managerApi/uploadimg');

router.post('/activities_img',activities_img.single('h_img'),(req,res,next)=>{
    res.json({
        status:0,
        msg:'上传成功',
        data:{
            g_img:"/images/activities/" +req.file.filename
        }
    })
});

router.get('/activities_dizhi',(req,res,next)=>{
    const sql = `SELECT * FROM t_h_dizhi`;
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

router.get('/activities_biaoqian',(req,res,next)=>{
    const sql = `SELECT * FROM t_h_biaoqian`;
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

router.get('/activities_zhaosheng',(req,res,next)=>{
    const sql = `SELECT * FROM t_h_zhaosheng`;
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

router.get('/activities_zhouqi',(req,res,next)=>{
    const sql = `SELECT * FROM t_h_zhouqi`;
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

router.post('/activities',(req,res,next)=>{
    const { h_mame, h_time, h_img, h_biaoqianid, h_dizhid, h_tianshuid,h_duixiangid,h_jieshao, h_anpai, h_riqi, h_focusimg } = req.body;

    const sql = `INSERT INTO t_h_huodong ( h_name, h_time,h_img, h_biaoqianid, h_duixiangid, h_dizid, h_tianshuid, h_jieshao, h_anpai, h_riqi, h_focusimg)
  VALUES (?,?,?,?,?,?,?,?,?,?,?);`;
    const values = [h_mame, h_time, h_img, h_biaoqianid, h_duixiangid,h_dizhid, h_tianshuid,h_jieshao, h_anpai, h_riqi, h_focusimg] ;
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

router.get('/activities_list',(req,res,next)=>{
    let pageNum = req.query.page_num || 1;
    let pageSize = req.query.page_size || 4;

    let sql = `SELECT t_h_huodong.*,t_h_zhaosheng.duixinag,t_h_dizhi.huodiz,t_h_zhouqi.zhouqi
     FROM t_h_huodong LEFT JOIN t_h_zhaosheng ON t_h_huodong.h_duixiangid = t_h_zhaosheng.id
      LEFT JOIN t_h_dizhi ON t_h_huodong.h_dizid = t_h_dizhi.id LEFT JOIN t_h_zhouqi ON t_h_huodong.h_tianshuid = t_h_zhouqi.id
      limit ${(pageNum-1)*pageSize},${pageSize}`;

    let sql1 = `SELECT COUNT(*) as counts FROM t_h_huodong`;

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

router.get('/activities_focus',(req,res,next)=>{
    let id = req.query.id;
    let focus = req.query.focus;

    let sql = `UPDATE t_h_huodong SET h_focus=? WHERE id=?`;
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

router.get('/activities_shanc',(req,res,next)=>{
    let id = req.query.id;

    let sql = `DELETE FROM t_h_huodong WHERE id=?`;
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

router.post('/activities_xiugai',(req,res,next)=>{
    const { id, h_mame, h_time , h_img, h_biaoqianid, h_dizhid, h_tianshuid,h_duixiangid, h_jieshao, h_anpai, h_focusimg,h_riqi } = req.body;
    const sql = `UPDATE t_h_huodong SET h_name=?, h_time=?,  h_img=?, h_biaoqianid=?, h_dizid=?, h_tianshuid=?,h_duixiangid=?, h_jieshao=?,
     h_anpai=?, h_riqi=?,h_focusimg=? WHERE id = ?; `;
    const values =[h_mame, h_time , h_img, h_biaoqianid, h_dizhid, h_tianshuid,h_duixiangid, h_jieshao, h_anpai,h_riqi, h_focusimg, id] ;
    console.log(values);
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