import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Grid, IconButton } from "@mui/material";
import ButtonComponent from "../../atom/ButtonComponent";
import CircularDot from "../../atom/CircularDot";
import HolidayDetails from "../HolidayDetails";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReorderIcon from "@mui/icons-material/Reorder";
import ListHolidayCalender from "../ListHolidayCalender";
import dates from "../../../MonthDates";

export default function TableComponent({
  value = null,
  day = null,
  holidayData = null,
  selecteDate = null,
}) {
  const [isActive, setIsActive] = React.useState(new Date().getDate());
  const [holidays, setHolidays] = React.useState([]);
  const [holidayDetails, setHolidayDetails] = React.useState([]);
  const [calendarToggle, setCalendarToggle] = React.useState(true);

  let slectedDate = dates.slice(0, value);
  let weekNo = [7, 7, 7, 7, 7, 7];

  for (let index = 0; index < day; index++) {
    slectedDate.unshift(null);
  }

  const handleBtnClick = (e, i) => {
    setIsActive(i);
    let date = new Date(selecteDate);
    let month = 1 + date.getMonth();
    let holidayDetail = holidayData?.filter(
      (item) =>
        item?.date ===
        date.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + i
    );
    setHolidayDetails(holidayDetail);
  };

  React.useEffect(() => {
    const x = holidayData?.map((item) => item?.date?.split("-")[2]);
    setHolidays(x);
  }, [holidayData, selecteDate]);

  const tableRows = () => {
    return weekNo.map((item, i) => {
      return (
        <TableRow
          key={i}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            borderBottom: "2px solid white",
          }}>
          {slectedDate.slice(item * i, item * (i + 1)).map((row, index) => (
            <TableCell key={index} align="center">
              {holidays?.find((item) => item === row) === undefined ? null : (
                <CircularDot />
              )}
              <ButtonComponent
                row={row}
                isActive={isActive}
                btnClick={(e) => {
                  handleBtnClick(e, row);
                }}
                value={row}
              />
            </TableCell>
          ))}
        </TableRow>
      );
    });
  };

  return value == null ? null : (
    <Box
      sx={{
        margin: "0px 75px",
        border: "1px solid gray",
        borderRadius: "5px",
      }}>
      <Box sx={{ display: "flex", justifyContent: "end", marginRight: "10px" }}>
        <IconButton
          color="gray"
          onClick={() => setCalendarToggle(true)}
          component="label">
          <DashboardIcon />
        </IconButton>
        <IconButton
          color="gray"
          onClick={() => setCalendarToggle(false)}
          component="label">
          <ReorderIcon />
        </IconButton>
      </Box>
      {calendarToggle ? (
        <Box sx={{border:"1px solid gray",margin:"10px" ,borderRadius:"5px"}}>
          <Grid container sx={{ margin: "10px" }}>
            <Grid item md={6}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead
                    sx={{
                      backgroundColor: "purple",
                      borderRadius: "100px !important",
                    }}>
                    <TableRow
                      sx={{
                        "& .MuiTableCell-root": {
                          color: "#fff",
                        },
                      }}>
                      <TableCell align="center">Sun</TableCell>
                      <TableCell align="center">Mon</TableCell>
                      <TableCell align="center">Tue</TableCell>
                      <TableCell align="center">Wed</TableCell>
                      <TableCell align="center">Thu</TableCell>
                      <TableCell align="center">Fri</TableCell>
                      <TableCell align="center">Sat</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableRows(slectedDate, handleBtnClick)}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={0.5}>
              <Box
                sx={{
                  backgroundColor: "gray",
                  width: "1px",
                  height: "480px",
                  margin: "0px 0px 0px 20px",
                }}></Box>
            </Grid>
            <Grid item md={5}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  marginTop: "60px",
                }}>
                <HolidayDetails holidayDetails={holidayDetails} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <ListHolidayCalender
          holidayData={holidayData}
          maxDate={value}
          currentDate={selecteDate}
        />
      )}
    </Box>
  );
}
