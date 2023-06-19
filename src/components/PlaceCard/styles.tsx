import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "440px",
  height: "fit-content",
  width: "100%",
  borderRadius: "10px",
  border: `3px solid ${theme.palette.grey[500]}`,

  "@media (max-width: 600px)": {
    maxWidth: "260px",
  },
}));

export { StyledCard };