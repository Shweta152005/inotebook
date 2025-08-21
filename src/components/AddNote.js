import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "" });

  const handleClick = (e) => {
    e.preventDefault();

    // ✅ Prevent empty or too short notes
    if (note.title.trim().length < 3) {
      alert("Title must be at least 3 characters long!");
      return;
    }
    if (note.description.trim().length < 5) {
      alert("Description must be at least 5 characters long!");
      return;
    }

    addNote(note.title, note.description);

    // ✅ Reset fields after adding note
    setNote({ title: "", description: "" });
    props.showAlert("Added Successfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            
            onChange={onChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;


