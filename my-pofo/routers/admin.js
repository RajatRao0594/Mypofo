let data = require('../my-data.json')
let express = require('express');
let router = express.Router();
const Project = require('../models/projectSchema')
const multer = require('multer');
const path = require('path')

let storage = multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,path.join(__dirname,'../static/image/projects'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage:storage})

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


router.get('/project/:alias',(req,res)=>{
    let alias = req.params.alias;
   console.log(alias)
    Project.findOne({alias:alias}).then(data =>{
        res.render('admin/project-detail',{
            title:'Project Detail',
            layout:'layout-admin',
            project:data
        })
    }).catch(err => next(err)) 
})

router.get('/project/:alias/delete',(req,res)=>{
    let alias = req.params.alias;

    Project.findOneAndDelete({alias:alias}).then(data =>{
     console.log(data)
     res.redirect('/admin/project')
    }).catch(err =>next(err))
})

router.post('/project/:alias/update',(req,res) =>{
    let bodyData = req.body;
    console.log(bodyData)
    let alias = req.params.alias;
    Project.findOneAndUpdate({alias:alias}, {$set:bodyData, $inc:{__v:1}},{new:true}).then(data =>{
        console.log(data)
        res.redirect('/admin/project')
    }).catch(err =>next(err))
})

router.get ('/project/:alias/image-upload',(req,res) =>{
    let alias = req.params.alias
    res.render('admin/upload',{
        title:'Upload',
        layout:'layout-admin',
        actionUrl:'/admin/project/'+alias+'/image-upload'
    })
})

router.post('/project/:alias/image-upload',upload.single('upload'),(req,res,next) =>{
    let file = req.file;
    console.log(file);

    Project.findOneAndUpdate({alias:req.params.alias},{$set:{imageUrl:`/image/project/
    ${file.originalname}`}},{new:true}).then(data =>{
        console.log(data)
        res.redirect('/admin/project')
    }).catch(err =>next(err))
})


module.exports = router;