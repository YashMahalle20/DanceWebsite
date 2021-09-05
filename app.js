const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance');
const port = 80;

//Define mongoose Schema
var contactSchema = new mongoose.Schema({
      name: String,
      phone: String,
      email: String,
      address: String,
      desc: String
    });

var Contact= mongoose.model('Contact' , contactSchema)

//Express Specific Stuff
app.use('/static' , express.static('static'));
app.use(express.urlencoded())


//Pug Specific Stuff
app.set('view engine', 'pug');
app.set('views' , path.join(__dirname , 'views'))

//End Points
app.get('/' , (req,res)=>{
      const params = { }  
      res.status(200).render('home.pug', params)
})
app.get('/contact' , (req,res)=>{
      const params = { }  
      res.status(200).render('contact.pug', params)
})
app.post('/contact' , (req,res)=>{
      var myData = new Contact(req.body);
      myData.save().then(()=>{
            res.send("This item has been saved to the database")
      }).catch(()=>{
        res.status(400).send("item was not send to the database")    
      })
     

      // res.status(200).render('contact.pug')
})
//Start the Server

app.listen(port , ()=>{
      console.log(`The Sereve is running at ${port}`);
})
