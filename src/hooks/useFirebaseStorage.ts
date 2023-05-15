import { storage } from "@/libs/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

type uploadImage = (
  imageFile: any
) => Promise<{ image: string; urlImage: string }>;

export const uploadToFirebase: uploadImage = async (imageFile) => {
  let urlImage = "";

  const image = imageFile;
  const imageName = `${uuidv4()}.${image.originalname.split(".").pop()}`;

  const imageRef = ref(storage, `/${imageName}`);

  const metadata = {
    contentType: "image/" + image.originalname.split(".").pop(),
  };

  await uploadBytes(imageRef, image.buffer, metadata).then(async (snaphsot) => {
    await getDownloadURL(snaphsot.ref).then((url) => {
      urlImage = url;
    });
  });

  return { image: imageName, urlImage };
};

export const removeFromFirebase = async (imageName: string) => {
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
