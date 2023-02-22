import React, { FormEvent, useState, useEffect } from "react";
import { Button, Input } from "../../components";
import Radio from "../../components/Radio";
import GoogleIcon from "../../assets/google.svg";
import { useLogin, useCustomError, useSignInWithGoogle, } from "../../hooks/useFirebase";
import { Logger } from '../../utils';
import Alert from "../../components/Alert";
import { AlertProps } from "../../components/Alert/Alert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  const [email, setEmail] = useState<string>("");
  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const getVal = (e: FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked);
  };

  const [getErrors, setErrors] = useState<AlertProps>({type: "failed", status: true, message: ''});
  const navigate = useNavigate()

  const LoginAction = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try{
      setIsButtonLoading(true)
      await useLogin(email, password);
      setErrors({type: "success", status: false, message: "Success"})
      setEmail("");
      setPassword("")
      navigate("/dashboard/new");
    } catch(err:any) {
      const error = useCustomError(err.message);
      if(error) setErrors({type: "failed", status: false, message: error?.toString()});
      Logger(error)
    }
  }

function CloseError(data:boolean){
  setErrors({...getErrors, status:data})
}

  return (
    <div className="mt-[120px] w-full min-h-[50vh]">
      <form className="w-[450px] max-w-full px-[5%] sm:px-[0px] mx-auto">
        <h1 className=" text-2xl text-center my-10 font-medium">Club login</h1>

        <Alert {...getErrors} func={CloseError}/>
        <div className="mb-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={password}
            placeholder="enter emaiil"
            onChange={handlePasswordChange}
            autocomplete="off"
            required
          />
        </div>

        <div className="mb-4">
          <Input
            label="Password"
            name="password"
            type="password"
            value={email}
            placeholder="enter password"
            onChange={handleEmailChange}
            autocomplete="off"
            required
          />
        </div>

        <Radio
          label={"keep me signed in"}
          name={"rememberme"}
          onClick={getVal}
        />
        <Button type="primary" Label="Login" fullWidth className="my-5" onClick={LoginAction}/>

        <div className="flex items-center my-[25px]">
          <hr className="flex-[0.5]" />
          <span className="mx-[31.5px]">OR</span>
          <hr className="flex-[0.5]" />
        </div>

        <Button
          Label="Sign in with Google"
          setIcon={GoogleIcon}
          type="secondary"
          fullWidth
          icon={GoogleIcon}
          altText="Google button"
        />
      </form>
    </div>
  );
};

export default Login;
