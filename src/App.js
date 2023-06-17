import "./App.css";
import "./SetUp.css";
import { BiCalendarPlus, BiUserPlus } from "react-icons/bi";
import { useState, useEffect } from "react";
import Form from "./components/form/Form";
import {
  CurrentUser,
  UserId,
  ClearData,
} from "./components/context/EmployeeContext";
import {
  getDatabase,
  ref,
  push,
} from "firebase/database";
import firebase from "./firebase";
import Logo from "./team-TRAX logo copy-01.svg";
import TeamInformation from "./components/teamInformation/TeamInformation";

function App() {
  const [currentEmployeeName, setCurrentEmployeeName] = useState("");
  const [userId, setUserId] = useState(null);
  let [toggleForm, setToggleForm] = useState(false);
  let [toggleDetail, settoggleDetail] = useState(false);
  const [formData, setFormData] = useState({
    key: "",
    radioSelection: "",
    timeOffData: {
      sickTime: [],
      personalTime: [],
    },
  });
  // create a variable to hold our database details and set the connection to the database.
  const database = getDatabase(firebase);
  // create a variable that makes reference to our database
  // const dbRef = ref(database);

  //  sate to set the toggle state of the button so eveytime the button is clicked the state is rerendered.
  

  useEffect(() => {

    
    if(!formData.key){
      formData.timeOffData.sickTime.length=0
      formData.timeOffData.personalTime.length=0
      return;
    }
    
      if (formData.timeOffData.sickTime.length > 0) {
        delete formData.radioSelection;
        push(ref(database, `${formData.key}/timeOffData/sickTime/`), {
          ...formData.timeOffData.sickTime,
        });
        setFormData({
          key: "",
          radioSelection: "",
          timeOffData: {
            sickTime: [],
            personalTime: [],
          },
        });
      } else if (formData.timeOffData.personalTime.length > 0) {
        delete formData.radioSelection;
        push(ref(database, `${formData.key}/timeOffData/personalTime/`), {
          ...formData.timeOffData.personalTime,
        });
        setFormData({
          key: "",
          radioSelection: "",
          timeOffData: {
            sickTime: [],
            personalTime: [],
          },
        });
      }
  }, [userId, currentEmployeeName, toggleForm, formData, database]);

  return (
    <CurrentUser.Provider
      value={{ currentEmployeeName, setCurrentEmployeeName }}
    >
      <UserId.Provider value={{ userId, setUserId }}>
        <ClearData.Provider value={{ formData, setFormData }}>
          <div className="App ">
            <header>
              <div className="header__text wrapper">
                <div className="headerText">
                  <h1>team-TRAX</h1>
                  <p>manage your teams attendance</p>
                </div>
                <div className="headerLogo">
                  <img className="logo" src={Logo} alt="" />
                </div>
              </div>
            </header>
            <main>
              <section className="publishData">
                <div className="wrapper">
                  <div className="main__button--container">
                    <button
                      className="main__button"
                      onClick={() => {
                        setToggleForm(!toggleForm);
                        settoggleDetail(false);
                      }}
                    >
                      <BiCalendarPlus id="calendarPlus" />
                      Track Time Off
                    </button>
                  </div>
                  <div className="formContainer">
                    {toggleForm && (
                      <Form clearForm={setToggleForm} 
                      clearDetail={settoggleDetail} />
                    )}
                  </div>
                </div>
              </section>

              {/* ****************************************** */}
              <section className="publishData">
                <div className="wrapper">
                  <div className="main__button--container">
                    <button
                      className="main__button"
                      onClick={() => settoggleDetail(!toggleDetail)}
                    >
                      <BiUserPlus id="userPlus" />
                      Show Team Details
                    </button>
                  </div>

                  <div className="teamInformation">
                    {toggleDetail && <TeamInformation />}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </ClearData.Provider>
      </UserId.Provider>
    </CurrentUser.Provider>
  );
}

export default App;
