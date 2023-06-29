import { IconButton, Link } from "@mui/material";
import { Close } from "@mui/icons-material";

import Form from "components/Form/Form";

import { IFormProps } from "shared/interface/interface";

import { LogoIcon } from "assets/icons";

import styles from "./AuthForm.module.scss";

interface IAuthForm {
  children: React.ReactNode;
  onSubmit: (form: IFormProps) => void;
  onClick?: () => void;
  onClose: () => void;
  linkText?: string;
  linkTo?: string;
}

const AuthForm = ({
  children,
  onSubmit,
  onClick,
  onClose,
  linkText,
  linkTo,
}: IAuthForm) => {
  const handleCloseForm = () => {
    onClose();
  };

  return (
    <div className={styles.formContainer}>
      <IconButton className={styles.closeButton} onClick={handleCloseForm}>
        <Close />
      </IconButton>
      <div className={styles.formHeader}>
        <LogoIcon className={styles.logoIcon} />
        <span className={styles.text}>Mappie</span>
      </div>
      <Form onSubmit={onSubmit}>{children}</Form>
      <div className={styles.linkContainer}>
        <span className={styles.text}>{linkText}</span>
        <Link className={styles.link} component="button" onClick={onClick}>
          {linkTo}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
