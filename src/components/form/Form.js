import "./Form.css";
import RadioSelection from "./radioSelection/RadioSelection";
import SearchEmployee from "./searchEmployee/SearchEmployee";
import { useState, useContext } from "react";
import DateRangeSelection from "./dateRangeSelection/DateRangeSelection";
import { UserId, ClearData, CurrentUser } from "../context/EmployeeContext";
import Modal from "./modal/Modal";


const Form = ({clearForm}) => {
  const clearDateRange = {
    startDate: "",
    endDate: "",
    numberOfDays: 0,
  };
  const [openModal, setOpenModel]= useState(false);
  const[showForm, setShowForm] = useState(true)
  const [radioSelection, setRadioSelection] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(clearDateRange);
  const { formData, setFormData } = useContext(ClearData);
  const { currentEmployeeName, setCurrentEmployeeName } =
    useContext(CurrentUser);
  const handleFormSubmit = (e) => {
    
    e.preventDefault();
    
    setFormData(formData);
    setShowForm(false);
    // setRadioSelection("");
    // setCurrentEmployeeName("");
    // clearForm(!true);
    if(radioSelection && currentEmployeeName){
      setOpenModel(true)
    }else{
      clearForm(!true);
      setRadioSelection("");
      setCurrentEmployeeName("");
    }
  };
  return (
    <>
      <div className="trackTime__form--container">
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            action=""
            className="trackTime__form"
          >
            <RadioSelection setRadioSelection={setRadioSelection} />
            <SearchEmployee />
            <DateRangeSelection updateDateRange={setSelectedDateRange} />
            <div>
              <button
                className="trackTime__submit--button"
                type="submit"
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
      {openModal && currentEmployeeName && (
        <Modal
          closeModal={setOpenModel}
          closeForm={setShowForm}
          radioSelection={radioSelection}
          selectedDateRange={selectedDateRange}
          clearFormCom={clearForm}
        />
      )}
    </>
  );
};

export default Form;
