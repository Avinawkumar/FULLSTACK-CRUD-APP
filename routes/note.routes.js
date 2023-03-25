//Notes.route.js
const express=require("express")
const jwt=require("jsonwebtoken")
const { NoteModel } = require("../model/note.model")

const notesRouter=express.Router()
//for all the following things authentication is required.
notesRouter.get("/", async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    try {
        if(decoded){
            const notes = await NoteModel.find({"userID":decoded.userID});
            res.status(200).send(notes)
        } else{
            res.status(400).send({msg:"No note has been created by this user"})
        }
        // const notes = await NoteModel.find();
        // res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


// post notes route
notesRouter.post("/create", async (req,res)=>{
    const payload=req.body
    try {
        const new_note=new NoteModel(req.body)
        await new_note.save()
        res.status(200).send({"msg":"Note Created"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
 })

// update notes route
notesRouter.patch("/update/:noteID", async(req,res)=>{
    const payload=req.body
    const noteID=req.params.noteID
    try {
        await NoteModel.findByIdAndUpdate({_id:noteID}, payload)
        res.status(200).send({"msg":"Note Updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

// delete notes route
notesRouter.delete("/delete/:noteID", async (req,res)=>{
    const noteID=req.params.noteID
    try {
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.status(200).send({"msg":"Note Deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


module.exports={
notesRouter
}
