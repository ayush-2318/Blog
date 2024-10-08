const express=require('express');
const path = require('path');
const app=express();
const PORT=8000;
const mongoose=require('mongoose')
const userRoute=require('./routes/user')
const blogRoute=require('./routes/blog')
const cookieParser=require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const Blog=require('./models/blog')

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token',()=>{console.log('Ayush')}))
app.use(express.static(path.resolve('./public/images')))

mongoose.connect("mongodb://localhost:27017/blogify").then((e)=>console.log('MongoDb connected'))

app.get('/',async(req,res)=>{
    const allBlogs=await Blog.find({})
    try{
        res.render('home',{
            user:req.user,
           blogs:allBlogs
        })
    } catch(error){
        console.log(error)
    }
    
})

app.use('/user',userRoute)
app.use('/blog',blogRoute)
app.listen(PORT,()=>(console.log(`Serever started at PORT :${PORT}`)));