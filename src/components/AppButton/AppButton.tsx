import { StyledButton } from "./styles";

interface IAppButtonProps {
  children: React.ReactNode;
  color: string;
}

const AppButton = ({ children, color }: IAppButtonProps) => {
  return <StyledButton>{children}</StyledButton>;
};

export default AppButton;
