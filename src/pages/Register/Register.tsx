import { useState, useEffect } from "react";
import { Button, Input } from "../../components";
import GoogleIcon from "../../assets/google.svg";
import {
  useAuthChange,
  useCustomError,
  UserType,
  useSignIn,
} from "../../hooks/useFirebase";
import { useNavigate } from "react-router-dom";
import BtnLoader from "../../components/Button/btnLoader";

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
      setError("");
      navigate("/profile");
      // navigate(`/cp/${user?.clubName}`);
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");

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

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!email || !password || !clubName || !fullName) {
      return setError("All inputs field must be filled!");
    }

    setLoading(true);
    try {
      await useSignIn(email, password, clubName, fullName);
    } catch (err: any) {
      const error = useCustomError(err.message);
      setError(error);
    }
  };

  return (
    <div className="h-auto ">
      <div className="w-[450px] max-w-full px-[5%] sm:px-[0px] mx-auto mt-[120px]">
        <h1 className="text-center mb-[41px] text-2xl font-medium">
          Club Register
        </h1>

        <form>
          <div className="mb-4">
            <Input
              label="Full Name"
              name="Full Name"
              onChange={handleFullNameChange}
              required
              value={fullName}
              autocomplete="off"
              placeholder="FirstName LastName"
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

          {/* <Button
            Label="Create Club Profile"
            isLoading
            type="primary"
            className="w-full font-medium"
            onClick={handleSubmit}
          /> */}

          <button
            className="w-full h-[60px] text-white font-medium bg-[var(--primary-color)] rounded-md"
            disabled={loading}
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? <BtnLoader /> : <span>Create Club Profile</span>}
          </button>

          <p className="text-red-500">{error}</p>

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
