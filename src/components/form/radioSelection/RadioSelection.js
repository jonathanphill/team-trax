import './RadioSelection.css';

const RadioSelection = ({setRadioSelection }) => {

  const onOptionChange = (event) => {
    const value = event.target.value;
    setRadioSelection(value);
  };
 
  return (
    <div className="trackTime__radio">
      <fieldset className="radioSet">
        <legend>Select Sick or Personal Time Off</legend>
        <div className="radio__sickTime">
          <input
            type="radio"
            id="sickTime"
            name="timeOff"
            value="sickTime"
            onChange={onOptionChange}
          />
          <label htmlFor="sickTime">Sick</label>
        </div>
        <div className="radio__personalTime">
          <input
            type="radio"
            id="personalTime"
            name="timeOff"
            value="personalTime"
            onChange={onOptionChange}
          />
          <label htmlFor="personalTime">Personal</label>
        </div>
      </fieldset>
    </div>
  );
};

export default RadioSelection;