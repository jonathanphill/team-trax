import "./FormDataPublish.css";
import {
  getDatabase,
  ref,
  onValue,
  get,
  push,
  update,
} from "firebase/database";
import firebase from "../../../firebase";
import { useState, useEffect } from "react";

const FormDataPublish = ({employee}) => {
    if(employee.key && employee.radioSelection){
        console.log(employee);
    }
     const database = getDatabase(firebase);
     const dbRef = ref(database);
//   useEffect(()=>{
//     delete employee.radioSelection;
//       // const newPostKey = push(child(ref(database), "0/posts")).key;
//       update(ref(database, `${employee.key}/timeOffData`), {
//         ...employee
//       });
//       onValue(dbRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log(data);
//       });

//   },[])

  return <div></div>;
}

export default FormDataPublish;