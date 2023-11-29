import { Chip } from "@mui/material";
import React from "react";

const HolidayDetails = ({ holidayDetails }) => {
  return (
    <>
      {holidayDetails?.map((item, i) => {
        return (
          <Chip
            sx={{ margin: "3px", padding: "25px 10px", fontSize: "18px" }}
            key={i}
            label={item?.name}
          />
        );
      })}
    </>
  );
};

export default HolidayDetails;
