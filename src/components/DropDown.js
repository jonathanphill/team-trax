import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import firebase from "../firebase";
import { FaSearch } from "react-icons/fa";
import "./DropDown.css";

const DropDown = () => {
  const [employees, setEmployees] = useState([]);
  const [searchedEmployees, setSeachedEmployees]= useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    // create a variable to hold our database details and set the connection to the database.
    const database = getDatabase(firebase);
    // create a variable that makes reference to our database
    const dbRef = ref(database);
    // add an event listener to that 'dbRef' variable that will fire
    // from the database, and call that data 'response'.
    onValue(dbRef, (response) => {
      // here we use Firebase's .val() method to parse our database info the way we want it
      //   console.log(response.val());
      setEmployees(response.val());
    });
  }, []);
  const handleChange = (event) => {
    let userInput = event.target.value;
    setInput(event.target.value);
    if (userInput) {
      const results = employees.filter((employee) => {
        return (
          employee.firstName.toLowerCase().includes(userInput.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(userInput.toLowerCase())
        );
      });
      setSeachedEmployees(results);
    }else{
        setSeachedEmployees([]);
    }
  };
  const SearchResults = ({searchedEmployees }) => {
    return (
      <div className="results-list">
        {searchedEmployees.map((employee) => {
          return (
            <li
              onClick={(e) => {
                setInput(e.currentTarget.textContent);
                setSeachedEmployees([]);
              }}
            >
              <p>{employee.firstName + "," + employee.lastName}</p>
            </li>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          type="text"
          placeholder="Type to search"
          value={input}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <SearchResults searchedEmployees={searchedEmployees}/>
      
    </>
  );
};

export default DropDown;
