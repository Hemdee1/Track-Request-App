import { useState, useEffect } from "react";
import { Button, Input } from "../../components";
import GoogleIcon from "../../assets/google.svg";
import {
  useAuthChange,
  useCustomError,
  UserType,
  useSignIn,
  useSignInWithGoogle,
} from "../../hooks/useFirebase";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import { AlertProps } from "../../components/Alert/Alert";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>("");
  const [clubName, setClubName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    useAuthChange(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(false);
      navigate("/profile");
      // navigate(`/cp/${user?.clubName}`);
    }
  }, [user]);

  const [loading, setLoading] = useState(false);

  const [getErrors, setErrors] = useState<AlertProps>({
    type: "failed",
    status: true,
    message: "",
  });

  function CloseError(data: boolean) {
    setTimeout(() => {
      setErrors({ ...getErrors, status: data });
    }, 3000);
  }

  const handleFullNameChange = (newValue: string) => {
    setFullName(newValue);
  };

  const handleClubNameChange = (newValue: string) => {
    setClubName(newValue);
  };

  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !password || !clubName || !fullName) {
      // return setError("All inputs field must be filled!");
      setErrors({
        type: "failed",
        status: false,
        message: "Input fields can not be empty",
      });
      CloseError(true);
      return;
    }

    setLoading(true);
    try {
      await useSignIn(email, password, clubName, fullName);

      setErrors({ type: "success", status: false, message: "Success" });
      CloseError(true);
    } catch (err: any) {
      const error = useCustomError(err.message);
      if (error)
        setErrors({
          type: "failed",
          status: false,
          message: error?.toString() + " or password",
        });
      CloseError(true);
    }
  };

  return (
    <div className="h-auto">
      <div className="w-[450px] max-w-full px-[5%] sm:px-[0px] mx-auto pt-[120px]">
        <h1 className="text-center mb-[41px] text-2xl font-medium">
          Club Register
        </h1>

        <Alert {...getErrors} func={CloseError} />

        <form>
          <div className="mb-4">
            <Input
              label="Full Name"
              name="Full Name"
              onChange={handleFullNameChange}
              required
              value={fullName}
              autocomplete="off"
              placeholder="Full Name"
              type="text"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Club Name"
              name="Club Name"
              onChange={handleClubNameChange}
              required
              value={clubName}
              autocomplete="off"
              placeholder="Club Name"
              type="text"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Email"
              name="email"
              onChange={handleEmailChange}
              required
              value={email}
              autocomplete="off"
              placeholder="hello@example@gmail.com"
              type="text"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Password"
              name="password"
              onChange={handlePasswordChange}
              required
              value={password}
              autocomplete="off"
              placeholder="XXXXXX"
              type="password"
            />
          </div>

          <Button
            Label="Create Club Profile"
            isLoading={loading}
            type="primary"
            className="w-full font-medium"
            onClick={handleSubmit}
          />

          <div className="flex items-center my-[25px]">
            <hr className="flex-[0.5]" />
            <span className="mx-[31.5px]">OR</span>
            <hr className="flex-[0.5]" />
          </div>

          <Button
            Label="Sign up with Google"
            setIcon={GoogleIcon}
            type="secondary"
            fullWidth
            icon={GoogleIcon}
            altText="Google button"
            onClick={() => useSignInWithGoogle()}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
