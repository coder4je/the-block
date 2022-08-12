import DatePicker from "react-datepicker";

export const FieldDatePicker = ({ input, placeholder, minDate, maxDate }) => (
  <DatePicker
    className="plus-icon"
    dateFormat="yyyy/MM/dd"
    selected={input.value || null}
    onChange={input.onChange}
    minDate={minDate}
    maxDate={maxDate}
    disabledKeyboardNavigation
    placeholderText={placeholder}
  />
);
