import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(({ color }) => ({
  minWidth: "40px",
  width: "60px",
  height: "60px",
  borderRadius: "6px",
  backgroundColor: color,

  "&.hover": {
    border: "3px solid #C4C4C4",
  },

  "@media (max-width: 600px)": {
    width: "40px",
    height: "40px",
  },
}));
