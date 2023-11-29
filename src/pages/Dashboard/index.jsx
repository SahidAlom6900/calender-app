import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableComponent from "../../components/molecule/TableComponent";
import Topbar from "../../components/molecule/Topbar";
import DatePickerComponent from "../../components/atom/DatePickerComponent";
import AutocompleteComponent from "../../components/atom/AutocompleteComponent";
import data from "../../data";
import CircularDot from "../../components/atom/CircularDot";
import DateComponent from "../../components/atom/DateComponent";

const options = [
  { country_code: "IN", label: "India" },
  {
    country_code: "NZ",
    label: "New Zealand",
  },
  {
    country_code: "CA",
    label: "Canada",
  },
  {
    country_code: "AE",
    label: "United Arab Emirates",
  },
  {
    country_code: "US",
    label: "United States",
  },
];

const Dashboard = () => {
  const [value, setValue] = useState();
  const [valueAutoOnChange, setValueAutoOnChange] = useState(null);
  const [holidayData, setHolidayData] = useState();
  const [day, setDay] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selecteDate, setSelectedDate] = useState(null);

  const handleOnDateChange = (newValue) => {
    let date = new Date(newValue);
    setDay(date.getDay());
    setValue(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
    setSelectedMonth(date);
    setSelectedDate(newValue);
    let x = data?.find(
      (element) => element?.country_code === valueAutoOnChange?.country_code
    );
    let year = date?.getFullYear();
    let mon = date?.getMonth() + 1;
    let holidayData = x?.holidays?.filter(
      (item) =>
        new Date(item.date) >=
          new Date(year + "-" + (mon < 10 ? "0" + mon : mon) + "-01") &&
        new Date(item.date) <=
          new Date(year + "-" + (mon < 10 ? "0" + mon : mon) + "-" + value)
    );
    setHolidayData(holidayData);
  };

  const handleAutoOnChange = (e, v) => {
    setValueAutoOnChange(v);
    let x = data?.find((element) => element?.country_code === v?.country_code);
    let year = selectedMonth?.getFullYear();
    let mon = selectedMonth?.getMonth() + 1;
    let holidayData = x?.holidays?.filter(
      (item) =>
        new Date(item.date) >=
          new Date(year + "-" + (mon < 10 ? "0" + mon : mon) + "-01") &&
        new Date(item.date) <=
          new Date(year + "-" + (mon < 10 ? "0" + mon : mon) + "-" + value)
    );
    setHolidayData(holidayData);
  };

  return (
    <Box>
      <Topbar />
      <DateComponent />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "25px 10px",
          gap: "100px",
        }}>
        <AutocompleteComponent
          autoOnChange={handleAutoOnChange}
          options={options}
        />
        <DatePickerComponent
          onDateChange={handleOnDateChange}
          label={"Month"}
        />
      </Box>
      <TableComponent
        holidayData={holidayData}
        value={value}
        day={day}
        selecteDate={selecteDate}
      />
    </Box>
  );
};

export default Dashboard;
