import Note from "../models/note.model.js";
export const createNote=async(req,res)=>{
    try{
        const {title,content}=req.body;
        if(!title || !content){
            return res.status(400).json({message:"Title and content is required"})
        }
        const newNote= new Note({title,content})
        await newNote.save()
        res.status(201).json(newNote)

    }catch(error){
        res.status(500).json({message:error.message})

    }
}


export const getNotes=async(req,res)=>{
    try{
       const notes=await Note.find().sort({createdAt:-1})
        res.status(200).json(notes)

    }catch(error){
          res.status(500).json({message:error.message})
        

    }

}

export const updateNote=async(req,res)=>{
    try{
        const {title,content}=req.body;
        const updateNote=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if(!updateNote){
            return res.status(404).json({message:"Note is not update "})
        }
        res.status(200).json(updateNote)

    }catch(error){
          res.status(500).json({message:error.message})
    }
}


export const deleteNote=async(req,res)=>{
    try{
        const deletedNote=await Note.findByIdAndDelete(req.params.id)
        if(!deleteNote){
            return res.status(404).json({message:"Note is not found"})  
        }
        res.status(200).json({message:"Note delete sucsseully"})


    }catch(error){
         res.status(500).json({message:error.message})

    }
}