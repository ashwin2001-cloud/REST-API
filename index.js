const express= require('express');
const app= express();
const port= 3000;

const db= require('./config/mongoose');

app.use(express.urlencoded());

app.use('/', require('./routes/index'));

app.listen(port, async (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Blog is running on port: ', port);
    }
})