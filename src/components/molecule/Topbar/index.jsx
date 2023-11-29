import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../../assets/images/logo.png";
import { Button, Modal, Typography, typographyClasses } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid gray",
  boxShadow: 24,
  p: 1,
};

export default function Topbar() {
  const [imgData, setImageData] = React.useState();
  const [showQR, setShowQR] = React.useState(false);

  const handleScanner = () => {
    const qrdata = async () => {
      try {
        const fetchData = await fetch(
          "http://localhost:9090/api/v1/attendance-qr",
          {
            method: "POST",
            headers: {
              candidateId: "TD202304000001",
            },
          }
        );
        const res = await fetchData.json();
        setImageData(res);
        setShowQR(true);
      } catch (error) {
        console.log(" error ", error);
      }
    };
    qrdata();
  };

  const hideQR = () => {
    setShowQR(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          "& .MuiToolbar-root": {
            minHeight: "55px",
          },
        }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img src={logo} alt="logo" loading="lazy" width={80} />
          <IconButton onClick={handleScanner}>
            <QrCodeScannerIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {showQR ? (
        <Modal open={showQR} aria-labelledby="1" aria-describedby="2">
          <Box sx={{ ...style, borderRadius: "10px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "5px",
              }}>
              <Typography>Candidate Attendance QR</Typography>
              <IconButton onClick={hideQR}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                height: "1px",
                backgroundColor: "gray",
              }}></Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
              }}>
              <img
                src={"data:image/png;base64," + imgData?.data}
                alt="QR Code"
              />
            </Box>
            <Box
              onClick={handleScanner}
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "end",
                paddingRight: "15px",
              }}>
              <Typography
                sx={{
                  border: "1px solid gray",
                  borderRadius: "5px",
                  padding: "5px",
                  backgroundColor: "purple",
                  color: "white",
                }}>
                Re-Generate QR Code
              </Typography>
            </Box>
          </Box>
        </Modal>
      ) : null}
    </Box>
  );
}
