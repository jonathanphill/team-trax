import "./App.css";
import "./SetUp.css";
import { BiCalendarPlus } from "react-icons/bi";
import { useState, useEffect } from "react";
import { CurrentUser, UserId } from "./components/context/EmployeeContext";
import Form from "./components/form/Form";

function App() {
  const [currentEmployeeName, setCurrentEmployeeName] = useState("");
  const [userId, setUserId] = useState(null);
 
  //  sate to set the toggle state of the button so eveytime the button is clicked the state is rerendered.
  let [toggleForm, setToggleForm] = useState(false);

  useEffect(()=>{
    setCurrentEmployeeName("");
    setUserId(null);
  },[toggleForm])
  return (
    <CurrentUser.Provider
      value={{ currentEmployeeName, setCurrentEmployeeName }}
    >
      <UserId.Provider value={{ userId, setUserId }}>
        <div className="App ">
          <header>
            <div className="header__text wrapper">
              <h1>team-TRAX</h1>
              <p>manage your teams attendance</p>
            </div>
          </header>
          <main>
            <div className="wrapper">
              <div className="trackTime__button--container">
                <button
                  className="trackTime__button"
                  onClick={() => {
                    setToggleForm(!toggleForm);
                  }}
                >
                  <BiCalendarPlus id="calendarPlus" />
                  Track Time Off
                </button>
              </div>
              <div className="formContainer">
                {toggleForm && <Form clearForm={setToggleForm} />}
              </div>
            </div>
          </main>
        </div>
      </UserId.Provider>
    </CurrentUser.Provider>
  );
}

export default App;
