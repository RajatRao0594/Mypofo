let data = require('../my-data.json')
let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
    let blog = data.myBlog
    let random = Math.floor(Math.random()*data.myBlog.length);
    res.render('blog',{
        layout:'layout',
        title:'blog',
        navblog:true,
        blog:blog,
        nav: data.blogCategories,
        featuredBlog:data.myBlog[random],
        blogCss:'<link rel="stylesheet" href="css/blog.css">'
    })
})
module.exports = router;