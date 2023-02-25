import React, { FormEvent, useState, useEffect } from "react";
import { AutoLoginLoading, Button, Input } from "../../components";
import Radio from "../../components/Radio";
import GoogleIcon from "../../assets/google.svg";
import {
  useLogin,
  useCustomError,
  useSignInWithGoogle,
  useAuthChange,
  UserType,
} from "../../hooks/useFirebase";
import { Logger } from "../../utils";
import Alert from "../../components/Alert";
import { AlertProps } from "../../components/Alert/Alert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  const [user, setUser] = useState<UserType | null>();
  const [autoLoginLoading, setAutoLoginLoading] = useState(true);

  useEffect(() => {
    useAuthChange(setUser);
  }, []);

  const [email, setEmail] = useState<string>("");
  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const getVal = (e: FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked);
  };

  const [getErrors, setErrors] = useState<AlertProps>({
    type: "failed",
    status: true,
    message: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    } else if (user === null) {
      setAutoLoginLoading(false);
    }
  }, [user]);

  const LoginAction = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setErrors({
        type: "failed",
        status: false,
        message: "Email and password can not be empty",
      });
      CloseError(true);
      return;
    }
    setIsButtonLoading(true);
    try {
      setIsButtonLoading(true);
      await useLogin(email, password);

      setErrors({ type: "success", status: false, message: "Success" });
      CloseError(true);

      setEmail("");
      setPassword("");

      navigate("/profile");
    } catch (err: any) {
      const error = useCustomError(err.message);

      if (error)
        setErrors({
          type: "failed",
          status: false,
          message: error,
        });
      CloseError(true);
      Logger(error);
    }

    setIsButtonLoading(false);
  };

  function CloseError(data: boolean) {
    setTimeout(() => {
      setErrors({ ...getErrors, status: data });
    }, 3000);
  }

  if (autoLoginLoading) {
    return <AutoLoginLoading />;
  }
  return (
    <div className="pt-[120px] w-full min-h-[50vh]">
      <form className="w-[450px] max-w-full px-[5%] sm:px-[0px] mx-auto">
        {" "}
        <h1 className="font-bold text-2xl text-[#6B6B6B] text-center mb-10 uppercase">
          Club Login
        </h1>
        <Alert {...getErrors} func={CloseError} />
        <div className="mb-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            placeholder="enter email"
            onChange={handleEmailChange}
            autocomplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            placeholder="enter password"
            onChange={handlePasswordChange}
            autocomplete="off"
            required
          />
        </div>
        <Radio
          label={"keep me signed in"}
          name={"rememberme"}
          onClick={getVal}
        />
        <Button
          type="primary"
          Label="Login"
          fullWidth
          className="my-5"
          onClick={LoginAction}
          isLoading={isButtonLoading}
        />
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
          onClick={() => useSignInWithGoogle()}
        />
      </form>
    </div>
  );
};

export default Login;
