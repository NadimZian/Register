const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/empform')
.then(()=>{
    console.log('Connect')
})
.catch((error)=>{
    console.log('Eroor');
})