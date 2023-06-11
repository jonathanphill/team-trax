import { FaSearch } from "react-icons/fa";
import "./SearchEmployee.css";
import { useState, useContext, useEffect, useRef } from "react";
import { CurrentUser, UserId, ClearData } from "../../context/EmployeeContext";
import { getDatabase, ref, onValue } from "firebase/database";
import firebase from "../../../firebase";

const SearchEmployee = () => {
  const [searchableList, setSearchableList] = useState([]);
  const { currentEmployeeName, setCurrentEmployeeName } =
    useContext(CurrentUser);
  const { formData, setFormData } = useContext(ClearData);
  const {setUserId } = useContext(UserId);
  const targetRef = useRef(null);
  useEffect(() => {
    const newState = [];
    // create a variable to hold our database details and set the connection to the database.
    const database = getDatabase(firebase);
    // create a variable that makes reference to our database
    const dbRef = ref(database);
    // add an event listener to that 'dbRef' variable that will fire
    // from the database, and call that data 'response'.
    onValue(dbRef, (response) => {
      // here we use Firebase's .val() method to parse our database info the way we want it
      const data = response.val();
      // console.log(data);
      for (let key in data) {
        newState.push({ key: key, employee: data[key] });
      }
      setSearchableList(newState);
    });
  }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const firstListItem = targetRef.current.querySelector("li");
        if (firstListItem) {
          firstListItem.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleChange = (e) => {
    const name = e.target.value;
    const inTheList= searchableList.some((obj)=>{
      return(obj.employee.firstName.toLowerCase().includes(name.toLowerCase()) ||
        obj.employee.lastName.toLowerCase().includes(name.toLowerCase()))
    })
    
    if(!inTheList){
      setCurrentEmployeeName("");
    }else{
      setCurrentEmployeeName(name);
    }
    
    // setEmployeeName(name);
    
  };

  const handleNameClick = (e) => {
    const clickedName = e.target.textContent;
    // setEmployeeName(clickedName);
    setCurrentEmployeeName(clickedName);
   
  };
  return (
    <div className="employee__list">
      <div className="nameContainer">
        <FaSearch id="search-icon" />
        <input
          className="nameContainer__input"
          type="text"
          id="searchEmployee__name"
          placeholder="Type name to search"
          value={currentEmployeeName}
          onChange={handleChange}
        />
      </div>
      <div className="selected__employee">
        <ul ref={targetRef}>
          {currentEmployeeName &&
            searchableList
              .filter((obj) => {
                return (
                  obj.employee.firstName
                    .toLowerCase()
                    .includes(currentEmployeeName.toLowerCase()) ||
                  obj.employee.lastName
                    .toLowerCase()
                    .includes(currentEmployeeName.toLowerCase())
                );
              })
              .map((obj) => {
                return (
                  <li
                    key={obj.key}
                    tabIndex={0}
                    onClick={(e) => {
                      handleNameClick(e);
                      setUserId(obj.key);
                      setFormData({
                        ...formData,
                        key: obj.key
                      });
                    }}
                  >
                    <p>
                      {obj.employee.firstName + ", " + obj.employee.lastName}
                    </p>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

export default SearchEmployee;
