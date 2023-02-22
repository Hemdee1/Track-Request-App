import { useState } from "react";
import { Button, Input } from "../../components";
import GoogleIcon from "../../assets/google.svg";

const Register = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFullNameChange = (newValue: string) => {
    setFullName(newValue);
  };

  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  return (
    <div className="h-auto ">
      <div className="w-[450px] max-w-full px-[5%] sm:px-[0px] mx-auto mt-[120px]">
        <h1 className="text-center mb-[41px] text-2xl font-medium">
          Club Register
        </h1>

        <form className="">
          <div className="mb-4">
            <Input
              label="Fullname"
              name="name"
              onChange={handleFullNameChange}
              required
              value={fullName}
              autocomplete="off"
              placeholder="Firstname Lastname"
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
              type="email"
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

          

          <Button type="primary" Label="Create Club Profile" fullWidth className="mt-10"/>

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
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
