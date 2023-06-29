import {
  collection,
  Firestore,
  DocumentData,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";

const addPlaceInfo = async (
  db: Firestore,
  userEmail: string,
  placeInfo: DocumentData,
): Promise<void | null> => {
  try {
    const collectionRef = collection(db, userEmail);
    await setDoc(doc(collectionRef), placeInfo);
  } catch (e) {
    console.error("Ошибка при добавлении документа: ", e);
    return null;
  }
};

const getCollection = async (
  db: Firestore,
  userEmail: string,
): Promise<DocumentData> => {
  try {
    const collectionRef = collection(db, userEmail);
    const collectionSnapshot = await getDocs(collectionRef);
    const collectionData = collectionSnapshot.docs.map((doc) => doc.data());

    return collectionData;
  } catch (e) {
    console.error("Error getting collection: ", e);
    return {};
  }
};

const deleteItem = async (
  db: Firestore,
  userEmail: string,
  placeId: string,
): Promise<void> => {
  try {
    const collectionRef = collection(db, userEmail);
    const querySnapshot = await getDocs(
      query(collectionRef, where("placeId", "==", placeId)),
    );
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

const isPlaceSaved = async (
  db: Firestore,
  userEmail: string,
  placeId: string,
): Promise<boolean> => {
  try {
    const collectionRef = collection(db, userEmail);
    const querySnapshot = await getDocs(
      query(collectionRef, where("placeId", "==", placeId)),
    );
    return !querySnapshot.empty;
  } catch (e) {
    console.error("Error checking if place is saved: ", e);
    return false;
  }
};

export { addPlaceInfo, getCollection, deleteItem, isPlaceSaved };
