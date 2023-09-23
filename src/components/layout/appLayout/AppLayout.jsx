import Header from "@/components/header/Header"
import React from "react"
import PropTypes from "prop-types"

const Applayout = ({heading, children}) => {
    return (
        <>
            <Header heading={heading}/>
            {children}
        </>
    )
}

Applayout.propTypes = {
    children: PropTypes.element,
    heading: PropTypes.string
}

export default Applayout