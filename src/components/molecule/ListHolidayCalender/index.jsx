import { Box, Grid } from "@mui/material";
import { padding } from "@mui/system";
import React, { useEffect } from "react";
import dates from "../../../MonthDates";
import CircularDot from "../../atom/CircularDot";
import HolidayDetails from "../HolidayDetails";

const HolidayFun = (holidayData, currentDate) => {
  let holidayDt = holidayData?.filter((item) => item?.date === currentDate);

  return <HolidayDetails holidayDetails={holidayDt} />;
};
let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const ListHolidayCalender = ({
  holidayData = null,
  maxDate = null,
  currentDate = null,
}) => {
  let newDates = dates?.slice(0, maxDate);
  let date = new Date(currentDate);
  let month = 1 + date.getMonth();
  let year = date.getFullYear();
  let dateHoliday = year + "-" + (month > 9 ? month : "0" + month);
  return (
    <Box
      sx={{
        border: "1px solid gray",
        margin: "5px",
        borderRadius: "5px",
        padding: "10px",
      }}>
      {newDates.map((item, i) => {
        return (
          <Box key={i} sx={{ margin: "10px 5px" }}>
            {holidayData?.find(
              (itemDt) => itemDt?.date === dateHoliday + "-" + item
            ) === undefined ? null : (
              <CircularDot />
            )}
            <Grid container>
              <Grid
                lg={1}
                md={1}
                sm={3}
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}>
                <Box
                  sx={{
                    backgroundColor: "purple",
                    color: "white",
                    padding: "5px",
                    borderRadius: "5px",
                  }}>
                  {item + "-" + (month > 9 ? month : "0" + month) + "-" + year}
                </Box>
                <Box
                  sx={{
                    marginTop: "2px",
                    color: "purple",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    fontSize: "16px",
                  }}>
                  {weekDay[new Date(year, month, i + 1).getDay()]}
                </Box>
              </Grid>
              <Grid lg={11} md={11} sm={9} xs={8}>
                {HolidayFun(holidayData, dateHoliday + "-" + item)}
              </Grid>
            </Grid>
            <Box
              sx={{
                backgroundColor: "gray",
                height: "1px",
                margin: "10px 0",
              }}></Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ListHolidayCalender;
