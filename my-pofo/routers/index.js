module.exports.index = (req,res)=>{
    res.render('index',{
        layout:'layout',
        title:'Album Page'
    })
}

module.exports.contact =(req,res) => {
    res.render('contact',{
        layout:'layout',
        title:'contact us'
    })
}

module.exports.blog =(req,res) =>{
    res.render('blog',{
        layout:'layout',
        title:'blog'
    })
}

module.exports.resume = (req,res) =>{
    res.redirect('/resume.pdf')
}
