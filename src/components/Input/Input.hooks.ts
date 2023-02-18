import { ChangeEvent } from "react";
import { InputFieldProps } from "./Input.type";

export default function useInputField(props: InputFieldProps){
    function handleChange(e: ChangeEvent<HTMLInputElement>){
        return props.onChange(e.target.value)
    }

    return{
        onChange: handleChange
    }
} 