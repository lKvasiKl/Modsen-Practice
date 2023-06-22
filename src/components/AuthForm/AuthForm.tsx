import { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Link,
} from "@mui/material";
import { VisibilityOff, Visibility, Close } from "@mui/icons-material";

import { LogoIcon } from "assets/icons";

import styles from "./AuthForm.module.scss";

interface IAuthProps {
  email: string;
  password: string;
}

interface IAuthForm {
  children: React.ReactNode;
  onSubmit: (form: IAuthProps) => void;
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
  const [form, setForm] = useState<IAuthProps>({ email: "", password: "" });
  const [isVisible, setVisible] = useState(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleClickShowPassword = () => {
    setVisible((prevState) => !prevState);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setEmailError("");
    setPasswordError("");
  };

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onSubmit(form);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setEmailError("Пользователь с таким email уже существует");
      } else if (error.code === "auth/weak-password") {
        setPasswordError("Слишком слабый пароль");
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setEmailError("Неправильный email или пароль");
        setPasswordError("Неправильный email или пароль");
      } else {
        setEmailError("Произошла ошибка входа");
        setPasswordError("Произошла ошибка входа");
      }
    }
  };

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
      <form className={styles.form} onSubmit={handleForm}>
        <FormControl className={styles.formControl} error={!!emailError}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            autoComplete="on"
            label="Email"
            name="email"
            type="email"
            onChange={handleChangeForm}
          />
        </FormControl>
        <FormControl className={styles.formControl} error={!!passwordError}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {isVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
            type={isVisible ? "text" : "password"}
            onChange={handleChangeForm}
          />
        </FormControl>
        {emailError && passwordError ? (
          <span className={styles.error}>{emailError}</span>
        ) : (
          <>
            {emailError && <span className={styles.error}>{emailError}</span>}
            {passwordError && (
              <span className={styles.error}>{passwordError}</span>
            )}
          </>
        )}
        <Button className={styles.button} type="submit">
          {children}
        </Button>
      </form>
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
