const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended:true }));
let id = 0;
const blog = {
    id: 0,
    name: "",
    author: "",
    date: new Date().toLocaleString()
};
let blogs = [];

app.get('/', (req,res) => {
    res.render('index.ejs',{blog,blogs});
});

app.post('/submit' , (req,res) => {
    const blogFromReq = {
        id:id++,
        name : req.body.name,
        author : req.body.author,
        date: req.body.date
    }
    blogs.push(blogFromReq);
    res.redirect('/');
});

app.post('/delete/:id', (req,res) => {
    const blogId = parseInt(req.params.id);
    const blogToEdit = blogs.find(blog => blog.id === blogId);
    res.render('edit.ejs', {blog:blogToEdit});
});

app.post('/edit/:id',(req,res) => {
    const blogId = parseInt(req.params.id);
    const index = blogs.findIndex(blog => blog.id === blogId);
    if(index !== -1) {
        blogs[index] = {
            id:blogId,
            name:req.body.name,
            author:req.body.author,
            date:req.body.date
        };
    }
    res.redirect('/');
});


app.listen(port, () => {console.log(`App is running in port: ${port}`);})