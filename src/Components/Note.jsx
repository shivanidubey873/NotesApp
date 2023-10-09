import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from "@material-ui/core/Fab";
import UpdateIcon from '@mui/icons-material/Update';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Note(props) {
  const [ErrorMessage , setErrorMessage] = useState("");
  const [isUpdatable, setUpdatable] = useState(false);
  const [note, setNote] = useState({
    title: props.title,
    content: props.content
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    if(note.title!=="" && note.content!==""){
      props.onUpdate(props.id,note.title,note.content);
      setNote({
        title: props.title,
        content: props.content
      });
      setUpdatable(false);
      setErrorMessage("");
    }
    else{
      setErrorMessage("Title and Content cannot be empty");
    }
  }

  function deleteNote() {
    props.onDelete(props.id);
  }

  function updateNote(){
    setUpdatable(true);
    //props.onUpdate(props.id,props.title,props.content);
  }

  return (
    <div>
      {isUpdatable && (
        <div className="create-note">
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
          <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows= {isUpdatable ? 3 : 1}
        />
        <Fab onClick={submitNote}>
            <CheckCircleOutlineIcon/>
        </Fab>
        <p>{ErrorMessage}</p>
        </div>
        )}
        
        {!isUpdatable && (<div className="note default">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button id="deleteIcon" onClick={deleteNote}>
        <DeleteIcon />
      </button>
      <button onClick={updateNote}>
        <UpdateIcon/>
      </button>
    </div>)}
    </div>
  );
}

export default Note;
