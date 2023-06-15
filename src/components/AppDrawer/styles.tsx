import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "500px",
  height: "100%",
  position: "absolute",
  backgroundColor: "#FFFFFF",
  boxShadow: "6px 0px 14px 1px #223c5020",
  zIndex: 1,

  "@media (max-width: 600px)": {
    maxWidth: "70px",
  },
}));

const StyledButton = styled(Button)(() => ({
  minWidth: "40px",
  width: "45px",
  height: "80px",
  borderRadius: "0 6px 6px 0",
  backgroundColor: "#FFFFFF",
  position: "absolute",
  left: "500px",
  boxShadow: "15px 0px 25px -5px #223c5020",
  zIndex: 1,

  "&:hover": {
    backgroundColor: "#FFFFFF",
  },

  "@media (max-width: 600px)": {
    width: "40px",
    height: "40px",
  },
}));

export { StyledBox, StyledButton };
