let data = require('../my-data.json');
let express = require('express');
let router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('index',{
        layout:'layout',
        title:'Album Page',
        navIndex:true
    })
});

 router.get('/contact',(req,res,next) =>{
    res.render('contact',{
        layout:'layout',
        title:'contact us',
        navContact:true
    })
});

router.get('/resume', (req,res,next) =>{
    res.redirect('/resume.pdf'),
    navResume=true
});

router.get('/project',(req,res,next)=>{
    res.render('projects',{
        title:'Project',
        layout:'layout',
        navProject:true
    })
});

router.get('/login',(req,res,next)=>{
    res.render('login',{
        title:'Login',
        layout:'layout-signin',
        extraCss:'<link rel="stylesheet" href="css/signin.css">',
        navLogin:true,
    })
});

const user =[
    {
        name:'Rajat',
        email:"test@test.com",
        password:"test"
    },
    {
        name:'Rao',
        email:'js@js.com',
        password:'javascript'
    }
]

router.post('/login',(req,res,next)=>{

       req.checkBody('email','Please enter email').notEmpty().isEmail().withMessage('Invalid Email');
       req.checkBody('password','Password field cannot be Empty').notEmpty().withMessage('Password is required')
       .isLength({
           min:3,
           max:undefined
       }).withMessage('Password is too short')
       var errors = req.validationErrors();
       if(errors) {
           let msgs = errors.map(ele => ele.msg);
           res.render('login',{
            title:'Login',
            layout:'layout-signin',
            extraCss:'<link rel="stylesheet" href="css/signin.css">',
            messages:msgs
        });
       }else{
           let data = req.body;
           let foundUser = user.filter(user =>data.email == user.email && data.password == user.password)
        //    if(data.email == user.email && data.password == user.password )
            if(foundUser.length>0) {
            req.session.isLoggedIn = true;
            req.session.user = foundUser[0];
           // req.session.user = user;
            // res.setHeader('Set-Cookie',"isLoggedIn= true;Max-Age=10;HttpOnly")
             
            res.redirect('/admin/dashboard')
           } else {
         
            res.render('login',{
                title:'Login',
                layout:'layout-signin',
                extraCss:'<link rel="stylesheet" href="css/signin.css">',
                messages:['Email or Password Wrong']
            });
           }  
        }       
})


 router.get('/logout',(req,res) =>{
     req.session.isLoggedIn =false;
     res.redirect('/');
 });

router.get('/signup',(req,res,next)=>{
    res.render('signup',{
        title:'signup',
        layout:'layout-signin',
        extraCss:'<link rel="stylesheet" href="css/signin.css">',
        navSignup:true
    })
});

router.post('/signup', (req,res,next)=>{
    let body = req.body;
    console.log(body)
    res.redirect('/login')
});

module.exports = router;