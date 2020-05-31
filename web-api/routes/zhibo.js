const express = require("express");
const router = express.Router();
const Query = require("./../config/dbHelper");
const { zhibo_img } = require('./../contreoller/managerApi/uploadimg');

router.post('/zhibo_img',zhibo_img.single('z_img'),(req,res,next)=>{
    res.json({
        status:0,
        msg:'头像上传成功',
        data:{
            g_img:"/images/zhibo/" +req.file.filename
        }
    })
});

router.get('/zhibo_zhuti',(req,res,next)=>{
    const sql = `SELECT * FROM t_b_zhuti`;
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

router.get('/zhibo_renqun',(req,res,next)=>{
    const sql = `SELECT * FROM t_b_renqun`;
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

router.post('/zhibo',(req,res,next)=>{
    const { token, z_mame, z_zuozhe, kaitime, jietime , z_renqun, z_jiayuan, z_jiage, z_dizhi, fengmian, focus } = req.body;

        const sql = `INSERT INTO t_b_zhibo ( b_name, b_zuozhe, b_jietime, b_kaitime, b_jiage, b_url, b_renqunid, b_zhutiid, b_img, b_focus)
  VALUES (?,?,?,?,?,?,?,?,?,?);`;
        const values = [z_mame, z_zuozhe, jietime, kaitime, z_jiage, z_dizhi, z_renqun, z_jiayuan, fengmian, focus] ;
    Query(sql,values).then((data)=>{
            res.json({
                status:data.code,
                msg:'直播课添加成功'
            })
        }).catch((err)=>{
            res.json({
                status:err.code,
                msg:'直播课添加失败'
            })
        })

});

router.get('/zhibo_list',(req,res,next)=>{
    let pageNum = req.query.page_num || 1;
    let pageSize = req.query.page_size || 4;

    let sql = `SELECT t_b_zhibo.*,t_b_renqun.b_renqun,t_b_zhuti.b_zhuti FROM t_b_zhibo 
    LEFT JOIN t_b_renqun ON t_b_zhibo.b_renqunid = t_b_renqun.id LEFT JOIN t_b_zhuti ON
    t_b_zhibo.b_zhutiid = t_b_zhuti.id limit ${(pageNum-1)*pageSize},${pageSize}`;

    let sql1 = `SELECT COUNT(*) as counts FROM t_b_zhibo`;

    Query(sql1).then((val)=>{
        Query(sql).then((val1)=>{
            res.json({
                status:val1.code,
                msg:'获取直播课程成功',
                data:{
                    counts:val.data,
                    list:val1.data
                }
            })
        })
    }).catch((err)=>{
           res.json({
               status:err.code,
               msg:'获取直播课程失败',
           })
    })
});

router.get('/zhibo_focus',(req,res,next)=>{
     let id = req.query.id;
     let focus = req.query.focus;

     let sql = `UPDATE t_b_zhibo SET b_isfocus=? WHERE id=?`;
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

router.get('/zhibo_shanc',(req,res,next)=>{
    let id = req.query.id;

    let sql = `DELETE FROM t_b_zhibo WHERE id=?`;
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

router.post('/zhibo_xiugai',(req,res,next)=>{
    const { id, z_mame, z_zuozhe, kaitime, jietime , z_renqun, z_jiayuan, z_jiage, z_dizhi, fengmian, focus } = req.body;
    const sql = `UPDATE t_b_zhibo SET b_name=?, b_img=?, b_jietime=?, b_kaitime=?, b_zuozhe=?, b_jiage=?, b_url=?, b_renqunid=?, b_zhutiid=?, b_focus=? WHERE id = ?; `;
    const values =[z_mame, fengmian, jietime, kaitime, z_zuozhe, z_jiage, z_dizhi, z_renqun, z_jiayuan, focus, id] ;
    console.log(values);
    Query(sql,values).then((data)=>{
            res.json({
                status:data.code,
                msg:'直播课修改成功'
            })
        }).catch((err)=>{
            res.json({
                status:err.code,
                msg:'直播课修改失败'
            })
        })

});

module.exports  = router;