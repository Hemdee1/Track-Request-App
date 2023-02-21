import React, { useState } from 'react'
import { Button, Input } from '../../components'
import GoogleIcon from '../../assets/google.svg';

const Register = () => {
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleFullNameChange = (newValue: string) => {
        setFullName(newValue)
    }

    const handleEmailChange = (newValue: string) => {
        setEmail(newValue)
    }

    const handlePasswordChange = (newValue: string) => {
        setPassword(newValue)
    }

  return (
    <div className='min-h-screen bg-'>
    {/* NAVBAR */}
    <h1 className='text-6xl'>Navbar</h1>

    <div className="w-1/3 mx-auto">
        <h1 className="text-center mb-[41px] font-Inter text-[32px]">Club Register</h1>

        <form>
            <Input 
                label='Fullname'
                name='name'
                onChange={handleFullNameChange}
                required
                value={fullName}
                autocomplete='off'
                placeholder='Firstname Lastname'
                type='text'
            />

            <Input 
                label='Emaii'
                name='email'
                onChange={handleEmailChange}
                required
                value={email}
                autocomplete="off"
                placeholder='hello@example@gmail.com'
                type='text'
            />

            <Input 
                label='Password'
                name='password'
                onChange={handlePasswordChange}
                required
                value={password}
                autocomplete='off'
                placeholder='XXXXXX'
                type='password'
            />

            <div className="flex my-[25px]">
                <input type="checkbox" className='w-[26px] h-[26px]'/>
                <p className="ml-4">Remember me</p>
            </div>

            <Button 
                type='primary'
                Label='Create Club Profile'  
                fullWidth
            />

            <div className='flex items-center my-[25px] border border-black'>
                <hr className='flex-[0.5]'/>
                <span className='mx-[31.5px]'>OR</span>
                <hr className='flex-[0.5]'/>
            </div>            

            <Button 
                Label='Sign up with Google'
                setIcon={GoogleIcon}
                type="secondary"
                fullWidth
                icon={GoogleIcon}
                altText='Google button'
            />

        </form>
    </div>
    </div>
  )
}

export default Register