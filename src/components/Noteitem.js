import React from "react";

const Noteitem = ({ note, deleteNote, updateNote, showAlert }) => {
  return (
    <div className="col-md-3">
      <div className="card my-3 shadow-sm" style={{ minHeight: "180px" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          {note.tag && <span className="badge bg-secondary">{note.tag}</span>}

          <div className="mt-3">
            <button
              className="btn btn-danger btn-sm mx-1"
              onClick={() => { 
                deleteNote(note._id); 
                showAlert("Deleted Successfully", "success"); 
              }}
            >
              Delete
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => updateNote(note)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;


