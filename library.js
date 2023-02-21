import express from "express";
import connectDB from "./librarydb.js";
import Library from "./libraryModel.js";

connectDB();
Library
const app=express();
app.use(express.json());

const library=[
{
    bookname:"Bluebook",
    category:"Grammer",
    authorname:"steephan"
},
{
    bookname:"planatation",
    category:"science",
    authorname:"josh evans"
},
{
    bookname:"the key of success",
    category:"story",
    authorname:"jerry clifford"
},
{
    bookname:"Discovery of India",
    category:"history",
    authorname:"josh evans"
},
{
    bookname:"The magic mango",
    category:"picture book",
    authorname:"josh evans"
},
{
    bookname:"Word power made easy",
    category:"vocabulary",
    authorname:"Norman lewis"
},
{
    bookname:"Believe in Yourself",
    category:"biography",
    authorname:"josheph murphy"
},
{
    bookname:"polynomials",
    category:"mathematics",
    authorname:"josh evans"
}
]


app.get("/api/library",(req,res) =>
{
    try{
        res.status(200).send(library);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
app.post("/api/librarydetails",async(req,res)=>{
    try{
        const library={
           bookname:req.body.bookname,
           category:req.body.category,
           authorname:req.body.authorname,
           
        }
        console.log(library);
        var create=new Library(library);
        var libraryCreated=await create.save();
      
        if(libraryCreated){
            console.log("created");
        res.status(201).json({message:"show details"});
        }
else{
    res.status(401);
    throw new error("not found");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);
app.put('/api/library/:id',(req,res)=>{
    console.log(req.params.id);
    Library.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            bookname:req.body.bookname,
            category:req.body.category,
            authorname:req.body.authorname,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_library:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    app.delete("/api/library/:id",(req,res)=>{
        console.log(req.params.id);
        Library.deleteOne({_id:req.params.id},{
            $set:{
               
                bookname:req.body.bookname,
            category:req.body.category,
            authorname:req.body.authorname,
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_library:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        app.delete("/api/library",(req,res)=>{
    
            Library.deleteMany({library},(err,result)=>{
            if(err) throw err
            res.send(library)
            })
        })
const port=4000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    console.log(library);
});