import { IAppButtonProps } from "shared/types";
import { StyledButton } from "./styles";

const AppButton = ({ children, color }: IAppButtonProps) => {
  return <StyledButton color={color}>{children}</StyledButton>;
};

export default AppButton;
