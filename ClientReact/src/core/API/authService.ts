import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryUrl } from "../baseQueryUrl";
import { SignInDTO } from "../dto/signInDto";
import SignInParams from "../dto/signInParams";
import SignUpParams from "../dto/signUpParams";

export interface SignInOutDTO {
  user: User;
}

interface User {
  email: string;
  password: string;
}



export const authApi = createApi({
  reducerPath:"authAPI",
  baseQuery: fetchBaseQuery({baseUrl:baseQueryUrl}),
  endpoints:(build) => ({   
    signIn: build.query<SignInDTO, SignInParams>({
      query: (args) => ({
          url: `/auth/login`,
          method: 'POST',
          body: args
      }),
    }),

    signUp: build.query<SignInDTO, SignUpParams>({
      query: (args) => {
        const data: SignUpParams = {
          email: args.email,
          password: args.password,
          username: args.username
        };

        return {
          url: '/auth/registration',
          method: 'post',
          data,
        };
      },
    })
  })
})

export const { useLazySignUpQuery, useLazySignInQuery } = authApi;
