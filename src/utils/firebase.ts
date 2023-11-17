import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs, getFirestore, serverTimestamp, query, onSnapshot,where } from "firebase/firestore";
import { firebaseConfig } from "../services/firebaseconfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addPost = async (article: any) => {
  try {
    const commentData = collection(db, "articleposts");
    await addDoc(commentData, {
      ...article,
      createdAt: serverTimestamp(),
    });
    console.log("Se añadió un artículo");
  } catch (error) {
    console.error(error);
  }
};

export const getPost = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "articleposts"));
    const posted: any = [];

    querySnapshot.forEach((doc) => {
      const article = doc.data();
      posted.push({
        id: doc.id,
        ...article,
      });
    });

    posted.sort((a: any, b: any) => (b.createdAt ? b.createdAt.toMillis() : 0) - (a.createdAt ? a.createdAt.toMillis() : 0));

    // Invierte el orden para que los más recientes estén primero
    return posted;
  } catch (error) {
    console.error(error);
    return [];
  } [];
  
};

export const escuchar = (fn:any) => {
  const q = query(collection(db, "articleposts"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
const post:any = [];
querySnapshot.forEach((doc) => {
    post.push(doc.data().text);
    console.log(doc.data());
});
console.log( post.join(", "));
fn(post)
});



 


};

export default {
  getPost,
  addPost,
  escuchar,
};
