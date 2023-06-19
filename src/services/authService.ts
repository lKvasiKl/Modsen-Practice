import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addSessionToStorage } from "helpers/tokens";
import { IAuthProps } from "shared/types";

const register = ({ email, password }: IAuthProps) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      user.getIdToken().then((accessToken) => {
        addSessionToStorage("accessToken", accessToken);
      });
    })
    .catch((error) => {
      throw error;
    });
};

const login = ({ email, password }: IAuthProps) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      user.getIdToken().then((accessToken) => {
        addSessionToStorage("accessToken", accessToken);
      });
    })
    .catch((error) => {
      throw error;
    });
};

export { register, login };
