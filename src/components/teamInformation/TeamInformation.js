import "./TeamInformation.css";
import firebase from "../../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

const SickLeaveInformation = ({sickLeaves})=>{
  // console.log(Object.keys(sickLeaves));
 return (
   <>
     <thead>
       <tr>
         <th colSpan="3">Sick Leave</th>
       </tr>
     </thead>
     <thead>
       <tr className="rowHeadings">
         <td>Number of Days</td>
         <td>Start Date</td>
         <td>End Date</td>
       </tr>
         {Object.keys(sickLeaves).map((items, i) => (
           <tr key={i}>
             <td className="centeredText">{sickLeaves[items][0].numberOfDays}</td>
             <td>{sickLeaves[items][0].startDate}</td>
             <td>{sickLeaves[items][0].endDate}</td>
           </tr>
         ))}   
     </thead>
   </>
 );
}
const PersonalLeaveInformation = ({ personalLeaves }) => {
  return (
    <>
      <thead>
        <tr>
          <th colSpan="3">Personal Leave</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <td>Number of Days</td>
          <td>Start Date</td>
          <td>End Date</td>
        </tr>
        {Object.keys(personalLeaves).map((items, i) => (
          <tr key={i}>
            <td className="centeredText">
              {personalLeaves[items][0].numberOfDays}
            </td>
            <td>{personalLeaves[items][0].startDate}</td>
            <td>{personalLeaves[items][0].endDate}</td>
          </tr>
        ))}
      </thead>
    </>
  );
};




const TeamInformation = () => {
  const employeeInfoToDisplay = {
    name: "",
    timeOffData: {},
  };
  const [searchableList, setSearchableList] = useState([]);
  // create a variable to hold our database details and set the connection to the database.
  const database = getDatabase(firebase);
  useEffect(() => {
    const newState = [];

    // create a variable that makes reference to our database
    const dbRef = ref(database);
    // add an event listener to that 'dbRef' variable that will fire
    // from the database, and call that data 'response'.
    onValue(dbRef, (response) => {
      // here we use Firebase's .val() method to parse our database info the way we want it
      const data = response.val();

      for (let key in data) {
        if (data[key].timeOffData) {
          newState.push({
            ...employeeInfoToDisplay,
            name: `${data[key].firstName + " " + data[key].lastName}`,
            timeOffData: { ...data[key].timeOffData },
          });
        }
      }
      setSearchableList(newState);
    });
  }, []);
  //  console.log(searchableList);
  return (
    <ul className="teamInformation__list">
      {searchableList.map((obj, i) => {
        return (
          <li key={i}>
            <div className="employeeTitle">
              <h3>{obj.name}</h3>
            </div>
            <div>
              <p></p>
              <table>
                {obj.timeOffData.sickTime && (
                  <SickLeaveInformation sickLeaves={obj.timeOffData.sickTime} />
                )}
                {obj.timeOffData.personalTime && (
                  <PersonalLeaveInformation
                    personalLeaves={obj.timeOffData.personalTime}
                  />
                )}
              </table>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TeamInformation;
