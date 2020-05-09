if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(() => console.log('mongo connected'))
.catch((err) => console.log(err));


app.use(cookieParser());
app.use(express.json());

app.use('/api/login', require('./routes/login'));
app.use('/api/register', require('./routes/register'));
app.use('/api/logout', require('./routes/logout'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// app.use(express.static(path.join(__dirname, 'client', 'build')));

// app.get('*', (req, res) => {
//   res.send(path.join(__dirname, 'client', 'build', 'index.html'))
// })



app.listen(process.env.PORT, function(){
  console.log(`server running on port ${process.env.PORT}`)
});