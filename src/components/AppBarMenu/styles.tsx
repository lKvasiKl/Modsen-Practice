import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "110px",
  width: "100%",
  borderRight: "2px solid #C0C0C0",

  "@media (max-width: 600px)": {
    maxWidth: "70px",
  },
}));
