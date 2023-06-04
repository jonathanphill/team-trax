import "./FormDataPublish.css";
import {ClearData } from "../../context/EmployeeContext";
import { useContext } from "react";
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
   const { formData, setFormData } = useContext(ClearData);
    if(employee.key && employee.radioSelection){
        console.log(`From Publish: ${formData}`);
    }
     const database = getDatabase(firebase);
     const dbRef = ref(database);


  return <div></div>;
}

export default FormDataPublish;