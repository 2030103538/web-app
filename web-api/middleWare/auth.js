module.exports = (req,res,next)=>{

    if(req.path.indexOf('/api/auth') === -1){
        return next();
    }

    if(req.path.indexOf('/api/auth/admin/login') !== -1 || req.path.indexOf('/api/auth/admin/reg') !== -1){
        return next();
    }

    if(req.session.token){
        return  next();
    }
    if(req.path.indexOf('/api/auth') !== -1){
        res.json({
            status:0,
            msg:"非法访问"
        })
    }

 return next(new Error('非法访问...'))

};