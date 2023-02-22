import { useState } from "react";
import { Welcome, Input } from "../components";

const Home = () => {
  const [fullName, setFullName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleNameChange = (newValue: string) => {
    setFullName(newValue)
  }

  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  }

  const handleSubmit = () => {
   if(fullName.length === 0 || password.length === 0){
    alert("field cannot be empty")
    return
   }
   console.log(fullName, password);
  }

  return (
    <main>
      <Welcome />
      <Input 
        label="username"
        name="username"
        type="text"
        value={fullName}
        placeholder="Name"
        onChange={handleNameChange}
        autocomplete="off"
        required
      />

      <Input 
        label="Password"
        name="password"
        onChange={handlePasswordChange}
        type="password"
        required
        value={password}
        autocomplete="off"
      />

      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
};

export default Home;
