import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";
import { differenceInDays } from "date-fns";
import { useState, useContext, useMemo, useEffect } from "react";
import "./DateRangeSelection.css";

const DateRangeSelection = ({ updateDateRange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

 useEffect(()=>{
        updateDateRange({
          startDate: format(startDate, "MM/dd/yyyy"),
          endDate: format(endDate, "MM/dd/yyyy"),
          numberOfDays: differenceInDays(endDate, startDate) + 1,
        });

 },[endDate,startDate, updateDateRange ])


  const handleDateSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);

    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };

  return (
    <div className="dateRangePicker">
      <p>Select Day/s</p>
      <DateRangePicker
        className="trackTime__date"
        ranges={[selectionRange]}
        rangeColors={["#FD5B61"]}
        onChange={handleDateSelect}
      />
    </div>
  );
};

export default DateRangeSelection;
