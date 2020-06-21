import React from "react";
import '../Input/Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && touched && shouldValidate
}

const Input: React.FC = props => {
    const htmlFor = `${Math.random()}`

    if(isInvalid(props)) {

    }

    return (
        <div className="Input">
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type='text'
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            { isInvalid(props) && <span>{props.errorMessage}</span> }
        </div>
    )
}

export default Input