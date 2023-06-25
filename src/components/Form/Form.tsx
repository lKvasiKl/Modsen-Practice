import { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { IFormProps } from "shared/interface/interface";

import styles from "./Form.module.scss";

interface IForm {
  children: React.ReactNode;
  onSubmit: (form: IFormProps) => void;
}

const Form = ({ children, onSubmit }: IForm) => {
  const [form, setForm] = useState<IFormProps>({ email: "", password: "" });
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

  return (
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
  );
};

export default Form;
