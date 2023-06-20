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
import { VisibilityOff, Visibility } from "@mui/icons-material";

import { LogoIcon } from "assets/icons";

import styles from "./AuthForm.module.scss";

interface IAuthForm {
  children: React.ReactNode;
  onSubmit: (form: object) => void;
  onClick?: () => void;
  linkTo: string;
}

const AuthForm = ({ children, onSubmit, onClick, linkTo }: IAuthForm) => {
  const [form, setForm] = useState({});
  const [isVisible, setVisible] = useState(false);

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
    setForm({ ...form, [name]: value });
  };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(form);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <LogoIcon className={styles.logoIcon} />
        <span className={styles.text}>Mappie</span>
      </div>
      <form className={styles.form} onSubmit={handleForm}>
        <FormControl className={styles.formControl}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            label="Email"
            type="email"
            onChange={handleChangeForm}
          />
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
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
            type={isVisible ? "text" : "password"}
            onChange={handleChangeForm}
          />
        </FormControl>
        <Button className={styles.button}>{children}</Button>
        <div className={styles.linkContainer}>
          <span className={styles.text}>Don&apos;t have an account?</span>
          <Link className={styles.link} component="button" onClick={onClick}>
            {linkTo}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
