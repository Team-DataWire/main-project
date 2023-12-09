"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_calendar_1 = __importDefault(require("react-calendar"));
require("react-calendar/dist/Calendar.css"); // import default CSS styling of calendar component
function CalendarItem(_a) {
    var value = _a.value, onChange = _a.onChange;
    var startDate = new Date(2022, 8, 5);
    var endDate = new Date(2022, 11, 15);
    /**
     * Return a date of format "MM/DD/YYYY" or "MM/DD/YYYY - MM/DD/YYYY" depending on whether a single date or a range of dates is selected
     * @returns string representation of the date(s) selected
     */
    var displayTime = function () {
        var _a, _b;
        if (value === null) {
            return "No date selected";
        }
        else if (value instanceof Date) {
            return value.toLocaleDateString();
        }
        else {
            return ((_a = value[0]) === null || _a === void 0 ? void 0 : _a.toLocaleDateString()) + " - " + ((_b = value[1]) === null || _b === void 0 ? void 0 : _b.toLocaleDateString());
        }
    };
    return (<div>
      <h2>{displayTime()}</h2>
      <react_calendar_1.default onChange={onChange} value={value} selectRange={true} // allows user to select range of dates
     minDate={startDate} // sets the minimum starting date
     maxDate={endDate} // sets the maximum date that can be selected (inclusive)
     maxDetail="month" // sets the maximum detail that can be displayed (month)
     view="month" // sets the default view of the calendar (month)
    />
      <button className="flex justify-center" onClick={function () { return onChange([startDate, endDate]); }}>
        All-Time
      </button>
    </div>);
}
exports.default = CalendarItem;
