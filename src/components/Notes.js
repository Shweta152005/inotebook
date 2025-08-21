import React, { useContext, useEffect, useState, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote } = context;

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      props.showAlert("Please login first", "danger");
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  // open modal with note data
  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
    ref.current.click();
  };

  // handle save changes
  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      {localStorage.getItem('token') ? (
        <>
          <AddNote showAlert={props.showAlert} />

          {/* hidden button to trigger modal */}
          <button
            type="button"
            className="btn btn-primary d-none"
            ref={ref}
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            Launch demo modal
          </button>

          {/* Bootstrap Modal */}
          <div
            className="modal fade"
            id="editModal"
            tabIndex="-1"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">Edit Note</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="etitle"
                        name="etitle"
                        value={note.etitle}
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="edescription"
                        name="edescription"
                        value={note.edescription}
                        onChange={onChange}
                        required
                        minLength={5}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="etag" className="form-label">Tag</label>
                      <input
                        type="text"
                        className="form-control"
                        id="etag"
                        name="etag"
                        value={note.etag}
                        onChange={onChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={refClose}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleClick}
                  >
                    Update Note
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes list */}
          <div className="row my-3">
            <h2>Your Notes</h2>
            {notes.length === 0 && <p>No notes available</p>}
            {notes.map((note) => (
              <Noteitem
                key={note._id}
                note={note}
                deleteNote={deleteNote}
                updateNote={updateNote}
                showAlert={props.showAlert}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Notes;


