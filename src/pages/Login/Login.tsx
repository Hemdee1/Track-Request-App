import React, {FormEvent, useState} from 'react'
import { Button, Input } from '../../components'
import Radio from '../../components/Radio';
import GoogleIcon from '../../assets/google.svg';

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
      <form className='w-[450px] max-w-full px-[5%] sm:px-[0px] mx-auto'>

        <h1 className=' text-2xl text-center my-10'>Club login</h1>
        <div className='mb-4'>
        <Input
            label="Email"
            name="email"
            type="text"
            value={password}
            placeholder="enter emaiil"
            onChange={handlePasswordChange}
            autocomplete="off"
            required
          />
          </div>

          <div className='mb-4'>
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

        <Radio label={'keep me signed in'} name={'rememberme'} onClick={getVal}/> 
        <Button type="primary" Label="Login" fullWidth className='my-5' />

        <div className='flex items-center my-[25px]'>
                <hr className='flex-[0.5]'/>
                <span className='mx-[31.5px]'>OR</span>
                <hr className='flex-[0.5]'/>
            </div>            

            <Button 
                Label='Sign in with Google'
                setIcon={GoogleIcon}
                type="secondary"
                fullWidth
                icon={GoogleIcon}
                altText='Google button'
            />


      </form>
    </div>
  )
}

export default Login