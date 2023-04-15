import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const uploadToFirebase = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const image = req.file;
  const imageName = `${uuidv4()}.${image.originalname.split(".").pop()}`;

  const imageRef = ref(storage, `/${imageName}`);

  const metadata = {
    contentType: "image/" + image.originalname.split(".").pop(),
  };

  await uploadBytes(imageRef, image.buffer, metadata).then(async (snaphsot) => {
    await getDownloadURL(snaphsot.ref).then((url) => {
      req.file.key = imageName;
      req.file.location = url;
    });
  });

  next();
};

export default uploadToFirebase;
