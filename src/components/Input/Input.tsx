import { ChangeEvent, useState } from "react"
import { InputFieldProps } from "./Input.type";
import useInputField from "./Input.hooks";
import {BiShow} from 'react-icons/bi';
import {BiHide} from 'react-icons/bi';
import './input.css';

const Input = (props: InputFieldProps) => {
    // const { onChange } = useInputField(props); 
    // might have to use the input.hook.ts to make and abstract functions if i have to

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        return props.onChange(newValue);
    };

    const handleIconToggle = (e: any) => {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

  return (
    // try to 
    <div className={props.type === "password" ? `password__input w-full` : `w-full`}>
        <label htmlFor={props.name} className="font-normal text-xl mb-2 block text-black font-Inter">
            {props.label}
        </label>

        <input 
            className={"border border-gray-300 placeholder-[#B4B4B4] rounded py-4 pl-7 w-full"}
            id={props.name}
            name={props.name}
            type={showPassword ? "text" : props.type || 'text'}
            required={props.required}
            value={props.value}
            onChange={handleInputChange}
            autoComplete={props.autocomplete}
            placeholder={props.placeholder}
        />
        
        {props.type === "password" && 
        <button 
            className={props.type === "password" ? 'password__inputButton' : ''}
            onClick={handleIconToggle}

        >
            {showPassword ? (
                <BiShow />
            ): (
                <BiHide />
            )}
        </button>
        }
    </div>
  )
}

export default Input