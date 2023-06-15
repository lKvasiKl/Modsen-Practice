import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "440px",
  height: "fit-content",
  width: "100%",
  borderRadius: "10px",
  border: "3px solid #808080",
}));

export { StyledCard };
