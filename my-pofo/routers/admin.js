let data = require('../my-data.json')
let express = require('express');
let router = express.Router();
const Project = require('../models/projectSchema')
const multer = require('multer');
const path = require('path');
const mediaService = require('../service/uploadMediaService');
const projectService = require('../service/projectService')

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

router.get('/project',(req,res,next)=>{

    function renderProjectList(err,data){
        if(err){
            next(err)
        }else{
            res.render('admin/project-list',{
                title:'project list',
                layout:'layout-admin',
                navProjects:true,
                projects:data    
            })
        }
    }

    projectService.getProjectList(renderProjectList)  
});

router.get('/project/create', (req,res) => {
    res.render('admin/project-create', {
        title: "Create New Project",
        layout: "layout-admin"
    })
});

router.post('/project/create',(req,res,next)=>{
    let data = req.body;
    console.log(data)
    let alias = data.name.toLowerCase().trim().split(' ').join('-')
    console.log(alias)
    data.alias = alias;

    let newProject = new Project(data);
    newProject.save().then(projectSaved =>{
        res.redirect('/admin/project')
    }).catch(err =>next(err))       
});


router.get('/project/:alias',(req,res)=>{
    let alias = req.params.alias;
 
   function renderProjectDetail(err,data){
       if(err){
           next(err)
       }else{
        res.render('admin/project-detail',{
            title:'Project Detail',
            layout:'layout-admin',
            project:data
        })
       }     
    }projectService.getSingleProject(alias,renderProjectDetail)
});


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
});


router.get('/project/:alias/upload-demo',(req,res) =>{
     let alias = req.params.alias;

     res.render('admin/upload',{
            title:'Demo upload',
            layout:'layout-admin',
            actionUrl:'/admin/project/'+alias+'/upload-demo'
     })
});

router.post('/project/:alias/upload-demo',(req,res) =>{
    let alias = req.params.alias;

    let dir = path.join(__dirname,'../static/project-demos/'+alias)
    let filename = alias+'.zip'

    function uploaded(err,success){
        console.log('cb called')
        if(err){
            console.log(err)
        }else{
            console.log('Uploaded')
            res.redirect('/admin/project')
        }
    }
    mediaService.uploadMedia(req,res,dir,filename,uploaded)
})


module.exports = router;