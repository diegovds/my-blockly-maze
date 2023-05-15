import { storage } from "./firebase";
import { ref, deleteObject } from "firebase/storage";

const removeFromFirebase = async (imageName: string) => {
  // Create a reference to the file to delete
  const desertRef = ref(storage, imageName);

  // Delete the file
  await deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

export default removeFromFirebase;
