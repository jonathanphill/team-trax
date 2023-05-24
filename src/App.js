import './App.css';
import {BiUserPlus } from "react-icons/bi";
import DropDown from './components/DropDown';
import AddTimeOff from './components/AddTimeOff';
function App() {
  return (
    <div className="App wrapper">
      <h1>team-TRAX</h1>
      <p>manage your teams attendance</p>
      <div className="search-bar-container">
        <p>
          <BiUserPlus id="user-icon" /> Select an Employee
        </p>
        <DropDown />
      </div>
      <div>
        <AddTimeOff/>
      </div>
    </div>
  );
}

export default App;


//   /* <ul>
//         {employees.map((employee) => {
//           return (
//             <li key={employee.id}>
//               <p>{employee.firstName +", "+employee.id}</p>
//             </li>
//           );
//         })}
//       </ul> */
