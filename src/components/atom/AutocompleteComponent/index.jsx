import { Autocomplete, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const AutocompleteComponent = ({ options = {}, autoOnChange = () => {} }) => {
  return (
    <Stack spacing={1} sx={{ width: "20%" }}>
      <Autocomplete
        options={options}
        onChange={autoOnChange}
        id="country"
        sx={{
          transition: "background-color 5s ease-out",
          "&:hover": {
            backgroundColor: "#E2e5f7",
          },
          "& .MuiAutocomplete-root": {
            "&:hover": {
              borderBottom: "9px solid yellow !important",
            },
          },
          "& .MuiFormLabel-root": {
            color: "purple",
          },
          "& .MuiInputBase-root:after": {
            borderColor: "purple",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Country"
            variant="standard"
          />
        )}
      />
    </Stack>
  );
};

export default AutocompleteComponent;
