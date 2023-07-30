import { useLazySignInQuery, useLazySignUpQuery } from "../core/API/authService";
import SignInParams from "../core/dto/signInParams";
import SignUpParams from "../core/dto/signUpParams";
import { selectUser, setUser } from "../store/reducers/authSlice";
import { useAppDispatch, useTypedSelector } from "../store/store";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useTypedSelector(selectUser);
  const isLoggedIn = Boolean(user);

  const [triggerSignInQuery] = useLazySignInQuery();
  const signIn = async (values: SignInParams) => {
    const { data } = await triggerSignInQuery(values, false);

    if (!data) {
      throw new Error('No data in query');
    }

    dispatch(setUser(data));
  };

  const [triggerSignUpQuery] = useLazySignUpQuery();
  const signUp = async (values: SignUpParams) => {
    const { data } = await triggerSignUpQuery(values, false);

    if (!data) {
      throw new Error('No data in query');
    }

    dispatch(setUser(data));
  };

  const logOut = () => {
    dispatch(setUser(null));
  };

  return { isLoggedIn, signIn, signUp, logOut, user };
};