import { useState, useContext } from "react";
import { UserId, ClearData, CurrentUser } from "../../context/EmployeeContext";
import "./Modal.css";
const Modal = ({ closeModal, selectedDateRange, radioSelection }) => {
  const { formData, setFormData } = useContext(ClearData);
  const { currentEmployeeName, setCurrentEmployeeName } =
    useContext(CurrentUser);
  const { userId } = useContext(UserId);

  const handleConfirmation= (e)=>{
    setFormData({
      ...formData,
      timeOffData: {
        sickTime: [],
        personalTime: [],
      },
    });
     e.preventDefault();
     if (userId && radioSelection) {
       if (radioSelection === "sickTime") {
         formData.timeOffData.sickTime.push(selectedDateRange);
       } else if (radioSelection === "personalTime") {
         formData.timeOffData.personalTime.push(selectedDateRange);
       }
     }
     setFormData(formData);

  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}> X </button>
        </div>
        <div className="title">
          <h3>{currentEmployeeName}</h3>
        </div>
        <div className="body">
          <p>
            {formData.radioSelection === "sickTime"
              ? formData.radioSelection.replace("sickTime", "Sick Leave ")
              : formData.radioSelection === "personalTime"
              ? formData.radioSelection.replace(
                  "personalTime",
                  "Personal Leave"
                )
              : ""}
          </p>
          <p>{`Start Date: ${selectedDateRange.startDate}`}</p>
          <p>{`End Date: ${selectedDateRange.endDate}`}</p>
          <p>{`Number of Day/s: ${selectedDateRange.numberOfDays}`}</p>
        </div>
        <div className="footer">
          <button onClick={() => closeModal(false)} id="cancelBtn">
            Cancel
          </button>
          <button onClick={handleConfirmation}>Confirm</button>
        </div>
      </div>
      {/* <form action="">
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" value={currentEmployeeName} />
          <label htmlFor="timeOff">Leave: </label>
          <input type="text" id="timeOff" 
          value={radioSelection==='personalTime' ? "Personal Leave": "Sick Leave"} />
          <p>{`Start Date: ${selectedDateRange.startDate}`}</p>
          <p>{`End Date: ${selectedDateRange.endDate}`}</p>
          <p>{`Number of Day/s: ${selectedDateRange.numberOfDays}`}</p>
        </form> */}
    </div>
  );
};

export default Modal;
