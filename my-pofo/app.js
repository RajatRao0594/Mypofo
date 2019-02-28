const express = require('express')
const app = express()
const hbs =require('hbs')
const bodyParser = require('body-Parser')
const logger = require('./middleware/mware')
const validator = require('express-validator')
// session authentication
const session = require('express-session');

const mongoose = require('mongoose');                  

const index = require('./routers/index');       
const blog = require('./routers/blog');
const project = require('./routers/project');
const admin = require('./routers/admin');

//set view engines
app.set('views',__dirname+'/views');
app.set('view engine','hbs');

app.use(express.static(__dirname+'/static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(validator());

mongoose.connect('mongodb://localhost:27017/mean',{             // connection with mongoose
useNewUrlParser:true},function(err,data){
    if(err){
        console.log(err)
    }else{
        console.log('DB connection Successfull')
    }
})


app.use(session({                            //will create a session object on server
    secret:'my secret',                       
    resave:false,                            // everytime dont save the value
    saveUninitialized:false,                // until the user is not making changes at UI dont store the value

    cookie:{maxAge:1000000}                 // in milliseconds
}));

hbs.registerPartials(__dirname+'/views/partials')
hbs.registerHelper('inc', function(value, options){
    return value+1;
});

app.use(logger.authenticated)                       //authenticating globally
app.use(logger.log)
app.use('/',index);
app.use('/blogs',blog);
app.use('/projects',project);

app.use('/admin',logger.authenticate,admin);       // authenticating for admin

app.use(logger.notFoundError)
app.use(logger.handleError)

app.listen(3007,()=>console.log('Server started at port no. 3007'))