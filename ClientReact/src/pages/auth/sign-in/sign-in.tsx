import { FC, useCallback, useState } from "react";
import "./sign-in.scss"
import * as yup from 'yup';
import { ErrorList } from "../../../components/errorList/errorList";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Input } from "../../../components/input/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

interface SignInProps {}

interface SignInFormValues {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

export const SignIn: FC<SignInProps> = () => {
  const { signIn } = useAuth();
  
  const { register, handleSubmit, formState } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await signIn(values);
      navigate('/');
    } catch (e) {
      toast.error("Something wen't wrong. Please, try again later");
    }
  };


  return ( 
    <div className="text-center signin-container">
      <form 
        className="form-signin"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <img className="mb-4" src="images/logo.png" alt="" width="200" height="200"/>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <ErrorList cssclasses="text-danger signin-errorlist" errors={formState.errors}/>

        <Input cssclasses="form-control" placeholder="Email" type="email" {...register('email')} />
        <Input
          cssclasses="form-control"
          placeholder="Password"
          type="password"
          {...register('password')}
        />

        <div className="checkbox mb-3">
            <label>
                <input type="checkbox"/> Remember me
            </label>
        </div>

        <div className="d-grid gap-2">
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={formState.isSubmitting}
          >
            Sign In
          </button>
        </div>
        <div className="pt-2">Don't have an account? <a className="text-primary" href="/sign-up">Sign Up</a></div>
      </form>
    </div>
   );
}
