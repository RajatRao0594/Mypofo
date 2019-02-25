let data = require('../my-data.json')
let express = require('express');
let router = express.Router();
const Project = require('../models/projectSchema')



router.get('/',(req,res,next)=>{
    res.render('login',{
        title:'Login',
        layout:'layout-signin',
        extraCss:'<link rel="stylesheet" href="css/signin.css">',
        navLogin:true,
    })
});


router.get('/dashboard',(req,res) =>{
    res.render('admin/dashboard',{
       title:'Dashboard template',
       layout:'layout-admin',
       navSidebar:true
   })
});

router.get('/project',(req,res)=>{

     Project.find({},function(err,projectList){
        if(err){
            next(err)
        }else{
            res.render('admin/project-list',{
                title:'project list',
                layout:'layout-admin',
                navProjects:true,
                projects:projectList    
            })
        }
    })  
});

router.get('/project/create', (req,res) => {
    res.render('admin/project-create', {
        title: "Create New Project",
        layout: "layout-admin"
    })
})

router.post('/project/create',(req,res,next)=>{
    let data = req.body;
    console.log(data)
    let alias = data.name.toLowerCase().trim().split(' ').join('-')
    console.log(alias)
    data.alias = alias;

    let newProject = new Project(data);
    newProject.save(function(err,data){
        if(err){
            next(err)
        }else{
            console.log(data)
            res.redirect('/admin/project')
        }
    })
})


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