import express from "express";
import fs from "fs";
const app = express();
const port  = 3000;
var d = new Date().getFullYear();
var color = [
    `color:#FFBF00;`,
   ` color:lightblue;`,
    `color:grey;`,
    `color:lightpink;`
]
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    let color2 = color[Math.floor(Math.random() * color.length)];

    res.render("index.ejs",{
        color3:color2,
        date:d
    });
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs",{
        date:d
    });
})

app.get("/blog",(req,res)=>{
    res.render("blog.ejs",{
        date: d
    })
})

app.get("/form",(req,res)=>{
    res.render("form.ejs",{
        date:d
    })
})

app.post("/submit",(req,res)=>{
    var title = req.body['title'];
    var content = req.body["description"];
    var heading = req.body["heading"];
    fs.writeFile("views/" +title +".ejs",'<%- include("partials/header.ejs")%> '+"<div class = 'container-3'>" +"<h1 class = 'heading-2'>"+heading +"</h1>"+"<p > "+content+"</p>"+ "</div>"+'<%- include("partials/footer.ejs")%>',(error)=>{console.log(error)});
    let num = 1;
    const id = setInterval(() => {
        if(num === 0){
            clearInterval(id)
            res.render(title + ".ejs",{
                date:d}
            )}else{
        num--;
    }
    }, 1);
})

app.get("/hello",(req,res)=>{
    res.render("hello.ejs",{
        date:d,
    });
})

app.listen(3000,()=>{
    console.log(`The server is started on port ${port}!`);
})

