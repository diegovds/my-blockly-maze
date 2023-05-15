import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { url } from "inspector";
import { v4 as uuidv4 } from "uuid";

type uploadImage = (
  imageFile: any
) => Promise<{ image: string; urlImage: string }>;

const uploadToFirebase: uploadImage = async (imageFile) => {
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

export default uploadToFirebase;
