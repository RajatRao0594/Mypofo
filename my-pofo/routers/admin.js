let data = require('../my-data.json')
let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
    res.render('login',{
        title:'Login Page',
        layout:'layout-signin',
        extraCss:'<link rel="stylesheet" href="css/signin.css">'
    })
});

router.get('/dashboard',(req,res) =>{
    res.render('admin/dashboard',{
       title:'Dashboard template',
       layout:'layout-admin'
   })
});

router.get('/project',(req,res)=>{
    res.render('admin/project-list',{
        title:'project list',
        layout:'layout-admin',
        projects:data.myProjects
    })
});

router.get('/projects/:alias',(req,res)=>{
    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];
    res.render('admin/project-detail',{
        title:'Project Detail',
        layout:'layout-admin',
        project:project
    })
})
module.exports = router;