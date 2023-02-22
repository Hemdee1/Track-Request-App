import React, {FormEvent, useState} from 'react'
import { Button, Input } from '../../components'
import Radio from '../../components/Radio';

const Login = () => {
  const [password, setPassword] = useState<string>('');
  const handlePasswordChange = (newValue: string) => {
    setPassword(newValue);
  };

  const [email, setEmail] = useState<string>('');
  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
  };

  const getVal = (e:FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked)
  }


  return (
    <div className='mt-[200px] w-full min-h-[50vh]'>
      <div className='w-[94%] sm:w-2/4 lg:w-2/5 mx-auto'>

        <h1 className=' text-2xl text-center my-10'>Club login</h1>
        <Input
            label="Email"
            name="email"
            type="string"
            value={password}
            placeholder="enter emaiil"
            onChange={handlePasswordChange}
            autocomplete="off"
            required
          />

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

        <Radio label={'keep me signed in'} name={'rememberme'} onClick={getVal}/> 
        <Button type="primary" Label="Login" fullWidth className='my-5' />

      </div>
    </div>
  )
}

export default Login