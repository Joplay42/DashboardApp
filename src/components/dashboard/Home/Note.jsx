import { useState } from "react"; // UseState imports
import { HiOutlineDotsVertical } from "react-icons/hi"; // React Icons
import { FaRegEdit } from "react-icons/fa"; // React Icons
import { MdOutlineDeleteForever, MdCancel } from "react-icons/md"; // React Icons
import { FaCheckCircle } from "react-icons/fa"; // React Icons
import { updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore"; // Firestore imports
import { db } from "../../../config/firebase"; // Firebase config

export default function Note({ note, onDelete, onUpdate }) {
  const [menuOpen, setMenuOpen] = useState(false); // State for the menu of the note
  const [edit, setEdit] = useState(false); // State when the user is editing the note
  const [updatedTitle, setUpdatedTitle] = useState(""); // New title for the note
  const [updatedDescription, setUpdatedDescription] = useState(""); // New description for the note

  /**
   * This handle is used to open the menu to edit and delete
   * the note. It is crucial for the user experience to manipulate the notes
   */
  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  /**
   * This method updates the note with the new title and description that the user
   * entered. It gets the id of the user to sync with his notes on the firebase.
   *
   * @param {*} id
   */
  const updateNote = async () => {
    try {
      const noteDoc = doc(db, "Note", note.id);
      // updating the doc from firebase
      await updateDoc(noteDoc, {
        Title: updatedTitle,
        Description: updatedDescription,
      });
      // Call the onUpdate function passed from the Home component to update the note
      onUpdate(note.id, updatedTitle, updatedDescription);
      // Close the edit mode
      setEdit(false);
    } catch (error) {
      console.error(error); // Error handling
    }
  };

  /**
   * This method is used to delete note, it refreshes the page to make it fast.
   * the note gets deleted right after. The method uses the id parameter to
   * sync with the current users note.
   *
   * @param {*} id
   */
  const deleteNote = async (id) => {
    try {
      const noteDoc = doc(db, "Note", id); // Gets the doc of the note from firebase
      await deleteDoc(noteDoc); // Delete note
      onDelete(id);
    } catch (error) {
      console.error(error); // Error handling
    }
  };

  //This return the single note with the menu to edit and delete.
  return (
    <div
      key={note.id}
      className="border-l-8 py-10 pl-10 pr-4 space-y-2 relative"
      style={{
        backgroundColor: `${note.Color}40`,
        borderColor: `${note.Color}`,
      }}
    >
      {/** NOTE */}
      <div className="flex justify-between relative">
        {/** If user is editing displays input title else displays title */}
        {edit ? (
          // Change the title
          <input
            className="font-bold bg-transparent border border-neutral-400 p-1"
            style={{ color: `${note.Color}` }}
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        ) : (
          <p className="font-bold" style={{ color: `${note.Color}` }}>
            {note.Title}
          </p>
        )}
        {/** If user is note editing displays menu button */}
        {!edit && (
          <HiOutlineDotsVertical
            className="w-5 h-auto cursor-pointer"
            onClick={handleMenuOpen} // Handle to display menu
          />
        )}
        <div
          className={
            // If menuOpen = true display the menu else make it hidden
            menuOpen
              ? `absolute text-sm text-neutral-600 -right-4 top-6 px-3 py-4 bg-white rounded-md shadow-lg border border-neutral-300`
              : `hidden`
          }
        >
          {/** MENU */}
          <div className="flex flex-col justify-start">
            {/** Edit button */}
            <div
              className="flex space-x-2 items-center group"
              onClick={() => (
                setEdit(true),
                setMenuOpen(!menuOpen),
                setUpdatedTitle(note.Title),
                setUpdatedDescription(note.Description)
              )}
            >
              <FaRegEdit className="mx-1 group-hover:text-neutral-400 group-hover:cursor-pointer" />
              <p className="group-hover:text-neutral-400 group-hover:cursor-pointer">
                Edit
              </p>
            </div>
            {/** Delete button */}
            <div
              className="flex space-x-2 items-center group"
              onClick={() => deleteNote(note.id)}
            >
              <MdOutlineDeleteForever className="group-hover:text-neutral-400 group-hover:cursor-pointer w-5 h-auto" />
              <p className="group-hover:text-neutral-400 group-hover:cursor-pointer">
                Delete
              </p>
            </div>
          </div>
        </div>
      </div>
      {/** If user is editing displays input description else displays description */}
      {edit ? (
        <div className="flex flex-col">
          {/** Change the description */}
          <textarea
            className="font-medium text-sm bg-transparent border border-neutral-400 p-1"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          {/** Submit and cancel buttons */}
          <div className="flex space-x-4 items-center mt-4">
            {/** Cancel button */}
            <button onClick={() => setEdit(!edit)}>
              <MdCancel className="w-6 h-auto text-red-500" />
            </button>
            {/** Submit button */}
            <button type="submit" onClick={() => updateNote(note.id)}>
              <FaCheckCircle className="w-[22px] h-auto text-green-500" />
            </button>
          </div>
        </div>
      ) : (
        // Displays description
        <p className="font-medium text-sm">{note.Description}</p>
      )}
      {/** Display timeStamp */}
      <p className="text-sm text-neutral-700 pt-4">{note.Timestamp}</p>
    </div>
  );
}
