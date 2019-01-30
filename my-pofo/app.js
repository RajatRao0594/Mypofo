const express = require('express')
const app = express()
const hbs =require('hbs')
const bodyParser = require('body-Parser')
const controller = require('./routers/index')
const logger = require('./middleware/mware')

app.set('views',__dirname+'/views');
app.set('view engine','hbs');


app.use(express.static(__dirname+'/static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
hbs.registerPartials(__dirname+'/views/partials')

app.use(logger.log)

app.get('/',controller.index)
app.get('/contact',controller.contact)
app.get('/blogs',controller.blog)
app.get('/resume',controller.resume)

app.use(logger.notFoundError)
app.use(logger.handleError)
app.listen(3007,()=>console.log('Server started at port no. 3007'))