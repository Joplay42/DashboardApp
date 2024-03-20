import { useEffect, useState } from "react"; // UseEffect, UseState
import { db, auth } from "../../../config/firebase"; // Firebase Config
import { collection, getDocs, query, where, doc } from "firebase/firestore"; // Firestore
import Note from "./Note"; // Components imports

export default function Home({ index }) {
  const [noteList, setNoteList] = useState([]); // The list of the notes to display them
  const noteCollectionRef = collection(db, "Note"); // Ref of the collection to get the notes on the firebase
  const [user, setUser] = useState(null); // The current user that is logged in
  const [loading, setLoading] = useState(true); // The loading state is the app loading?

  /**
   * This useEffact method is used to stay logged in when refreshing
   * the pages which helps with the user experiences
   */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is logged in
        setUser(user);
        setLoading(false);
        fetchNotes(user.uid); // Get notes from user.uid
      } else {
        setUser(null);
        setLoading(false);
        setNoteList([]); // Clear notes if user is not authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * This method is used to fetch the notes to then display them. It gets the
   * note from the user id so all the different user gets their notes separately
   *
   * @param {*} userId
   */
  const fetchNotes = async (userId) => {
    try {
      const q = query(noteCollectionRef, where("UserId", "==", userId)); // Get the query to get the data of the user
      const querySnapshot = await getDocs(q); // Get the docs of the firebase
      const filteredData = querySnapshot.docs.map((doc) => ({
        // Filter the data since they are raw when getting the docs
        ...doc.data(),
        id: doc.id,
      }));
      setNoteList(filteredData); // Sets the data to display
    } catch (error) {
      console.error("Error fetching notes:", error); // Error handling
    }
  };

  const updateNote = (id, updatedTitle, updatedDescription) => {
    setNoteList((prevNoteList) =>
      prevNoteList.map((note) =>
        note.id === id
          ? { ...note, Title: updatedTitle, Description: updatedDescription }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    setNoteList((prevNoteList) =>
      prevNoteList.filter((note) => note.id !== id)
    );
  };

  //Loading spinner while it loads
  if (loading) {
    return (
      // Loading spinner
      <div role="status" className="flex justify-center items-center h-full">
        <svg
          aria-hidden="true"
          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  //Returns the main user UI to display the note on the index Home
  return (
    <div className="col-span-3 px-10 py-8 lg:py-12">
      <div className="flex justify-between items-center">
        {/** Header of the home page */}
        <div>
          <p className="text-red-700 font-semibold">Home</p>
          <h1 className="hidden lg:block text-xl">
            Hey {user ? user.email : "Guest"}
          </h1>
        </div>
        {/** Profile informations button */}
        <div>
          <button className="bg-neutral-200 py-4 px-6 rounded-full text-xl">
            {user ? user.email.charAt(0).toUpperCase() : "G"}
          </button>
        </div>
      </div>
      {/** Displaying the noteList in a grid */}
      <div className="my-14">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {/** If there arent any note */}
          {noteList.length == 0 ? (
            <div className="text-center col-span-3 my-40 space-y-4">
              <h1 className="text-md text-neutral-600">
                There is nothing here for the moment.
              </h1>
              <button
                className="bg-red-700 text-white px-6 py-2 hover:bg-red-500"
                onClick={() => index(1)}
              >
                Create
              </button>
            </div>
          ) : (
            // Maps the notes
            noteList.map((note) => (
              <Note note={note} onDelete={deleteNote} onUpdate={updateNote} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
