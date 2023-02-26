const express = require('express');
const path = require('path');
const empCollection = require('./model/model');
require('./db/db');
const app = express();
const port = process.env.PORT || 3000;
const templatePath = path.join(__dirname, '../template/views');
app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/empdata', async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  const regex = /^(?=.*[A-Z])/;
  if (password.length < 8) {
    res.send('Password should be at least 8 characters long');
  } else if (!regex.test(password)) {
    res.send('Password must have at least one capital letter');
  } else if (password === cpassword) {
    const empData = new empCollection({ name, email, phone, password, cpassword });
    const postData = await empData.save();
    res.send(postData);
  } else {
    res.send("Passwords don't match");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
