module.exports.index = (req,res)=>{
    res.render('index',{
        layout:'layout',
        title:'Album Page',
        navIndex:true
    })
}

module.exports.contact =(req,res) => {
    res.render('contact',{
        layout:'layout',
        title:'contact us',
        navContact:true
    })
}

module.exports.blog =(req,res) =>{
    res.render('blog',{
        layout:'layout',
        title:'blog',
        navblog:true

    })
}

module.exports.resume = (req,res) =>{
    res.redirect('/resume.pdf')
    navResume=true
}

module.exports.project=(req,res)=>{
    res.render('project-detail',{
        title:'Project',
        layout:'layout',
        navProject:true
    })
}

module.exports.login=(req,res)=>{
    res.render('login',{
        title:'Login',
        layout:'layout-signin',
        extraCss:'<link rel="stylesheet" href="css/signin.css">',
        navLogin:true
    })
}

module.exports.doLogin =(req,res)=>{
       let body = req.body;
       console.log(body)
       res.redirect('/')
}

module.exports.signup = (req,res)=>{
    res.render('signup',{
        title:'signup',
        layout:'layout-signin',
        extraCss:'<link rel="stylesheet" href="css/signin.css">',
        navSignup:true
    })
}

module.exports.doSignup = (req,res)=>{
    let body = req.body;
    console.log(body)
    res.redirect('/login')
}