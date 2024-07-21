import React from 'react';

const Calendar = ({ selectedDate, onDateChange }) => {
  // Function to generate an array of days in a month
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // State to manage the current year and month
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());

  // Generate an array of days in the current month
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // Function to handle changing the month
  const changeMonth = (delta) => {
    const newMonth = currentMonth + delta;
    if (newMonth < 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11); // December
    } else if (newMonth > 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0); // January
    } else {
      setCurrentMonth(newMonth);
    }
  };

  // Function to check if a date is the current date
  const isCurrentDate = (date) => {
    const currentDate = new Date();
    return date.getDate() === currentDate.getDate() &&
           date.getMonth() === currentDate.getMonth() &&
           date.getFullYear() === currentDate.getFullYear();
  };

  return (
    <div className="bg-white p-2 rounded-2xl w-80 h-52">
      <div className="flex justify-between mb-4">
        <button className="text-primaryColor font-bold bg-transparentColor outline-none border-none cursor-pointer text-xs" onClick={() => changeMonth(-12)}>
          {"< Prev Year"}
        </button>
        <h2 className="font-bold text-xs">
          {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(new Date(currentYear, currentMonth, 1))}
        </h2>
        <button className="text-primaryColor font-bold bg-transparentColor outline-none border-none cursor-pointer text-xs" onClick={() => changeMonth(12)}>
          {"Next Year >"}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-xs">
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}

        {/* Days in the month */}
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`text-center cursor-pointer ${
              day.getMonth() !== currentMonth ? "text-secondaryColor bg-primaryColor" : ""
            } ${isCurrentDate(day) ? "text-white bg-primaryColor" : ""} ${selectedDate && day.toDateString() === selectedDate.toDateString() ? "text-primaryColor bg-background-main-screen" : ""}`}
            onClick={() => onDateChange(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
