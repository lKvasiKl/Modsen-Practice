import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { IAuthProps } from "shared/types";

import { addSessionToCookie } from "helpers/tokens";

const register = async ({ email, password }: IAuthProps) => {
  const auth = getAuth();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const accessToken = await user.getIdToken();
  addSessionToCookie("accessToken", accessToken);
};

const login = async ({ email, password }: IAuthProps) => {
  const auth = getAuth();
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const accessToken = await user.getIdToken();
  addSessionToCookie("accessToken", accessToken);
};

export { register, login };
