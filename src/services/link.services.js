import { db } from "../components/firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const linkCollection = collection(db, "dynamic-link-data");

class LinkServices {
  addLink = (newLink) => {
    return addDoc(linkCollection, newLink);
  };

  updateLink = (id, updatedlink) => {
    const linkDoc = doc(db, "dynamic-link-data", id);
    return updateDoc(linkDoc, updatedlink);
  };

  deleteLink = (id) => {
    const linkDoc = doc(db, "dynamic-link-data", id);
    return deleteDoc(linkDoc);
  };

  getAllLinks = () => {
    return getDocs(linkCollection);
  };

  getLink = (id) => {
    const linkDoc = doc(db, "dynamic-link-data", id);
    return getDoc(linkDoc);
  };
}

export default new LinkServices();
