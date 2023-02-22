import React, { useState } from 'react'
import { Button, Input, Navbar } from '../../components'
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
    <div className='min-h-screen '>
    <Navbar />

    <div className="w-1/3 mx-auto mt-[89px]">
        <h1 className="text-center mb-[41px] font-Inter text-[32px]">Club Register</h1>

        <form className=''>
            <div className='mb-4'>
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
            </div>

            <div className='mb-4'>
                <Input 
                    label='Email'
                    name='email'
                    onChange={handleEmailChange}
                    required
                    value={email}
                    autocomplete="off"
                    placeholder='hello@example@gmail.com'
                    type='text'
                />
            </div>

            <div className='mb-4'>
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
            </div>

            <div className="flex my-[25px]">
                <input type="checkbox" className='w-[26px] h-[26px]'/>
                <p className="ml-4">Remember me</p>
            </div>

            <Button 
                type='primary'
                Label='Create Club Profile'  
                fullWidth
            />

            <div className='flex items-center my-[25px]'>
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