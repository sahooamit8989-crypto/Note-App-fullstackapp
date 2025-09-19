// //create a context
// import {  createContext, useEffect, useState } from "react";
// import BACKEND_URL from "../../api/url";

// //create a function
// export const NoteContext=createContext();

// const NoteProvider=({children})=>{
//     const [notes,setNotes]=useState([]);
//     const [loading,setLoading]=useState(true)

// //fatch all notes
// const getNotes=async()=>{
//     loading(true)
//     try{
//         const response=await BACKEND_URL.get('/get-notes')
//         setNotes(response.data)

//     }catch(error){
//         console.error("Error featching notes :",error);

//     }finally{
//         setLoading(false)
//     }
// }
// useEffect(()=>{
//     getNotes()
// },[])

// //create a note
// const craeteNote=async(note)=>{
//     const res=await BACKEND_URL.post("/create-note",note)
//     setNotes([res.data,...notes])

// }

// //update a note
// const updateNote=async(id,updateNote)=>{
//     const res=await BACKEND_URL.post(`/update-note/${id}`,updateNote)
//     setNotes(notes.map((note)=>{note._id===id ? res.data :note}))

// }
// //delete a note
// const deleteNote=async(id)=>{
//     const res=await BACKEND_URL.post(`/delete-note/${id}`)
//     setNotes(notes.filter((note)=>(note._id!==id)))

// }

// return(
//     <NoteContext.Provider value={{notes,loading,craeteNote,updateNote,deleteNote}}>
//         {children}
//     </NoteContext.Provider>
// )

// }




// context/NoteContext.jsx
import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../../api/url";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all notes
  const getNotes = async () => {
    setLoading(true);
    try {
      const response = await BACKEND_URL.get('/get-notes');
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // Create a note
  const createNote = async (note) => {
    const res = await BACKEND_URL.post("/create-note", note);
    setNotes([res.data, ...notes]);
  };

  // Update a note
  const updateNote = async (id, updatedNote) => {
    const res = await BACKEND_URL.post(`/update-note/${id}`, updatedNote);
    setNotes(notes.map((note) => note._id === id ? res.data : note));
  };

  // Delete a note
  const deleteNote = async (id) => {
  try {
    await BACKEND_URL.delete(`/delete-note/${id}`);
    setNotes(notes.filter((note) => note._id !== id));
  } catch (error) {
    console.error("Delete failed:", error);
  }
};


  return (
    <NoteContext.Provider value={{ notes, loading, createNote, updateNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};
