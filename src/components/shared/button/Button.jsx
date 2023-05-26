import React from "react"
import PropTypes from "prop-types"

const Button = props => {
    const {label, type="button", className, ...rest} = props
    return <button type={type} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className && className}`} {...rest}>{label}</button>
}

Button.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string
}

export default Button