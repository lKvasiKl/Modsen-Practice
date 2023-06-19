import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "110px",
  width: "100%",
  borderRight: `2px solid ${theme.palette.grey[500]}`,

  "@media (max-width: 600px)": {
    maxWidth: "70px",
  },
}));

export { StyledBox };
