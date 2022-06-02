import {useState} from "react";

export const useInput = (initialValue = "") => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const resetValue = () => {
        setValue(initialValue)
    }

    return {value, onChange, resetValue}
}

export const useCheckbox = (initialChecked = false) => {
    const [checked, setChecked] = useState(initialChecked)

    const onChange = () => {
        setChecked(!checked)
    }

    const resetChecked = () => {
        setChecked(initialChecked)
    }

    return {checked, onChange, resetChecked}
}
