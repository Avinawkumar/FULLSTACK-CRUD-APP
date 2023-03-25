//notes.model.js
const mongoose=require("mongoose")

//note schema
const noteSchema=mongoose.Schema({
    title: String,
    note: String,
    userID: String
})

const NoteModel=mongoose.model("note",noteSchema)


module.exports={
NoteModel
}