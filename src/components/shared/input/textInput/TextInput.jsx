import React, { forwardRef } from "react"
import PropTypes from "prop-types"
import styles from "./TextInput.module.scss"

const TextInput = (props) => {
    const { label, classes={}, error, register=()=>null, name, ...rest } = props
    return (
        <div className={`text-gray-800 text-md ${classes?.root ? classes.root : ""}`}>
            {label && <label className={`${classes?.label ? classes.label : ""}`}>{label}</label>}
            <input
                {...register(name)}
                className={`border border-blue-300 text-gray-600 text-sm rounded-md focus:border-green-500 focus:ring-0 focus:outline-none block w-full px-[1rem] py-[0.25rem] ${classes?.input ? classes.input : ""}`}
                {...rest}
            />
            {error && <small className="text-red-600 font-normal">
            {error}
            </small>}
        </div>
    )
}

TextInput.propTypes = {
    label: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        label: PropTypes.string,
        input: PropTypes.string
    }),
    error: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
}

TextInput.displayName="TextInput"

export default TextInput