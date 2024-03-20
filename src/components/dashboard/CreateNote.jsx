import { useState } from "react"; // UseState
import { db, auth } from "../../config/firebase"; // Firebase Configs
import { collection, addDoc } from "firebase/firestore"; // Firestore

export default function Home() {
  const [title, setTitle] = useState(""); // The title for the note
  const [description, setDescription] = useState(""); // The description for the note
  const [color, setColor] = useState(""); // The color for the note

  const noteCollectionRef = collection(db, "Note"); // Ref for the collection of the notes on firebase

  /**
   * This method is used to create a new note from Firebase, it gets
   * the current user to create a note for this user.
   */
  const newNote = async () => {
    try {
      // Current user
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Check if user is logged in
        const userId = currentUser.uid;
        await addDoc(noteCollectionRef, {
          // Create a new doc in firebase with the title, descript, color, timestamp and user id.
          Title: title,
          Description: description,
          Color: color,
          Timestamp: new Date().toLocaleString() + "",
          UserId: userId,
        });
      } else {
        console.error("User not authenticated."); // Error handling
      }
    } catch (error) {
      console.error(error); // Error handling
    }
  };

  //This return the page to create a note
  return (
    <div className="space-y-3">
      {/** Form to create a note */}
      <div className="flex flex-col space-y-2">
        <label>Title : </label>
        {/** The title of the note */}
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="border border-neutral-300 px-4 py-2 rounded-full"
          type="text"
          placeholder="your title"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label>Description : </label>
        {/** The description of the note */}
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="border border-neutral-300 px-4 py-2 rounded-xl"
          placeholder="your note"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label>Note color : </label>
        {/** The color of the note */}
        <input
          onChange={(e) => setColor(e.target.value)}
          className="appearance-none w-10 h-10"
          type="color"
        />
      </div>
      {/** Submit button */}
      <button
        onClick={newNote}
        className="bg-red-400 text-white p-2 hover:bg-red-300"
      >
        Create new note
      </button>
    </div>
  );
}
