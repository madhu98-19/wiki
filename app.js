 //jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO
mongoose.connect("mongodb://localhost:27017/wikidb",{userNewUrlParser:true});
const articleSchema ={
  title:String,
  content:String
};
const Article = mongoose.model("Article",articleSchema);
app.get("/articles",function(req,res)
{
  Article.find(function(err,foundArticles)
  {
    if(!err)
    {
    res.send(foundArticles);
    }
    else
    {
      res.send(err);
    }
  });
});
app.post("/articles",function(req,res)
{
  console.log();
  console.log();
  const newArticle= new Article({
    title:req.body.title,
    content:req.body.content
  });
  newArticle.save(function(err)
  {
    if(!err)
    {
      res.send("Successfully added a new article")
    }
    else
    {
      res.send(err);
    }
  });
});
app.route("/articles/:articleTitle")
//req.params.articleTitle= "alibaba"
.get(function(req,res)
{
 Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
   if(foundArticle)
   {
     res.send(foundArticle);
   }
   else
   {
     res.send("No Article matche");
   }
 });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});