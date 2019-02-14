const express = require('express')
const app = express()
const hbs =require('hbs')
const bodyParser = require('body-Parser')
const logger = require('./middleware/mware')
const validator = require('express-validator')
// session authentication
const session = require('express-session');

const index = require('./routers/index');       
const blog = require('./routers/blog');
const project = require('./routers/project');
const admin = require('./routers/admin');

app.set('views',__dirname+'/views');
app.set('view engine','hbs');

app.use(express.static(__dirname+'/static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(validator());

app.use(session({ 
    secret:'my secret',                       //will create a session object on server
    resave:false,                            // everytime dont save the value
    saveUninitialized:false,                // until the user is not making changes at UI dont store the value

    cookie:{maxAge:1000000}
}));

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('inc', function(value, options){
    return value+1;
});

app.use(logger.authenticated)
app.use(logger.log)
app.use('/',index);
app.use('/blogs',blog);
app.use('/projects',project);
app.use('/admin',logger.authenticate,admin);

// app.get('/',controller.index)
// app.get('/contact',controller.contact)
// app.get('/resume',controller.resume)

// app.get('/blogs',controller.blog)
// app.get('/projects',controller.project)
//  app.get('/dashboard',controller.dashboard)
// app.get('/admin/projectlist',controller.adminProjectList)

// app.get('/login',controller.login)
// app.post('/login',controller.doLogin)
// app.get('/signup',controller.signup)
// app.post('/signup',controller.doSignup)

app.use(logger.notFoundError)
app.use(logger.handleError)
app.listen(3007,()=>console.log('Server started at port no. 3007'))