import { Button } from "@mui/material";
import React from "react";

const ButtonComponent = ({
  value = null,
  btnClick = () => {},
  row = null,
  isActive = null,
}) => {
  return (
    <Button
      variant="text"
      disableRipple
      onClick={btnClick}
      sx={{
        "&:hover": {
          backgroundColor: row == null ? "white" : "#d83ad8",
          color: row == null ? "black" : "white",
        },
        minWidth: "40px",
        height: "40px",
        margin: "0px",
        padding: "0",
        borderRadius: "50%",
        color: isActive !== value ? "#000" : "white",
        backgroundColor:
          isActive === value && isActive !== null ? "purple" : "white",
      }}>
      {value}
    </Button>
  );
};

export default ButtonComponent;
