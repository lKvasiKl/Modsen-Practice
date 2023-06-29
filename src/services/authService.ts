import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Cookie from "js-cookie";

import { IAuthProps } from "shared/interface/interface";

import { addSessionToCookie } from "helpers/tokens";

const register = async ({ email, password }: IAuthProps) => {
  const auth = getAuth();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const accessToken = await user.getIdToken();
  addSessionToCookie("accessToken", accessToken);
  Cookie.set("email", email);
};

const login = async ({ email, password }: IAuthProps) => {
  const auth = getAuth();
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const accessToken = await user.getIdToken();
  addSessionToCookie("accessToken", accessToken);
  Cookie.set("email", email);
};

export { register, login };
