import React, { Dispatch, SetStateAction } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar2.css"; // import default CSS styling of calendar component

// basic starter code from https://github.com/wojtekmaj/react-calendar/blob/main/packages/react-calendar/README.md
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarItem({
  value,
  onChange,
}: {
  value: Value;
  onChange: Dispatch<SetStateAction<Value>>;
}) {
  const startDate = new Date(2022, 8, 5);
  const endDate = new Date(2022, 11, 15);

  /**
   * Return a date of format "MM/DD/YYYY" or "MM/DD/YYYY - MM/DD/YYYY" depending on whether a single date or a range of dates is selected
   * @returns string representation of the date(s) selected
   */
  const displayTime = () => {
    if (value === null) {
      return "No date selected";
    } else if (value instanceof Date) {
      return value.toLocaleDateString();
    } else {
      return value[0]?.toLocaleDateString() + " - " + value[1]?.toLocaleDateString();
    }
  };

  return (
    <div>
      <h2>{displayTime()}</h2>
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={true} // allows user to select range of dates
        minDate={startDate} // sets the minimum starting date
        maxDate={endDate} // sets the maximum date that can be selected (inclusive)
        maxDetail="month" // sets the maximum detail that can be displayed (month)
        view="month" // sets the default view of the calendar (month)
      />
      <button className="flex justify-center" onClick={() => onChange([startDate, endDate])}>
        All-Time
      </button>
    </div>
  );
}

export default CalendarItem;
