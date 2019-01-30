module.exports.log = (req,res,next) =>{
    var url = req.url;
    var method = req.method;
    console.log(`${method} ${url}`)
     next();
    //  next(new Error('Testing handle Error middle'))
}

module.exports.notFoundError =function (req,res,next){
    res.render('404',{
        title:'Page not found',
        layout:'layout'
    })
}

module.exports.handleError=function(err,req,res,next){
    console.log(err);
    res.render('500',{
        title:'Something went wrong',
        layout:'layout'
    })

}