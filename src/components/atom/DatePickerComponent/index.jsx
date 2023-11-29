import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePickerComponent = ({
  label = "",
  value = null,
  onDateChange = () => {},
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="DD-MM-YYYY"
        views={["year", "month"]}
        onChange={onDateChange}
        label={label}
        slotProps={{
          textField: {
            variant: "standard",
            placeholder: "My Name Is Khan",
          },
        }}
        sx={{
          width: "20%",
          height: "50px",
          transition: "background-color 5s ease-out",
          "&:hover": {
            backgroundColor: "#E2e5f7",
          },
          "& .MuiFormLabel-root": {
            color: "purple",
          },
          "& .MuiInputBase-root:after": {
            borderColor: "purple",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
