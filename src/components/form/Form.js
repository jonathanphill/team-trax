import "./Form.css";
import RadioSelection from "./radioSelection/RadioSelection";
import SearchEmployee from "./searchEmployee/SearchEmployee";
import { useState, useContext } from "react";
import DateRangeSelection from "./dateRangeSelection/DateRangeSelection";
import { UserId, ClearData, CurrentUser } from "../context/EmployeeContext";
import Modal from "./modal/Modal";


const Form = ({ clearForm }) => {
  const clearDateRange = {
    startDate: "",
    endDate: "",
    numberOfDays: 0,
  };
  const [openModal, setOpenModel]= useState(false);
  const [radioSelection, setRadioSelection] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(clearDateRange);
  const { formData, setFormData } = useContext(ClearData);
  const { currentEmployeeName, setCurrentEmployeeName } =
    useContext(CurrentUser);
  const handleFormSubmit = (e) => {
    
    e.preventDefault();
    
    setFormData(formData);
    setRadioSelection("");
    setCurrentEmployeeName("");
    clearForm(!true);
    setOpenModel(true)
  };
  return (
    <>
      <div className="trackTime__form--container">
        <form onSubmit={handleFormSubmit} action="" className="trackTime__form">
          <RadioSelection setRadioSelection={setRadioSelection} />
          <SearchEmployee />
          <DateRangeSelection updateDateRange={setSelectedDateRange} />
          <div>
            <button className="trackTime__submit--button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {openModal && <Modal 
      closeModal={setOpenModel}
      radioSelection={radioSelection}
      selectedDateRange={selectedDateRange} />}
    </>
  );
};

export default Form;
