import { Button } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";
import { IAppButtonProps } from "shared/types";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5E7BC7",
    },
    secondary: {
      main: "#C75E5E",
    },
  },
});

const StyledButton = styled(Button)(({ color }: IAppButtonProps) => ({
  minWidth: "40px",
  width: "60px",
  height: "60px",
  borderRadius: "6px",
  backgroundColor: theme.palette[color].main,

  "&:hover": {
    backgroundColor: theme.palette[color].main,
    border: "3px solid #C4C4C4",
  },

  "@media (max-width: 600px)": {
    width: "40px",
    height: "40px",
  },
}));

export { theme, StyledButton };
