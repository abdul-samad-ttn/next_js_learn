"use client"
import React, { useCallback, useEffect, useState } from "react"
import Button from "../shared/button/Button"
import { LOCAL_STORAGE_USER_NAME } from "@/utils/constants/storageConstants"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/utils/constants/routerConstants"
import PropTypes from "prop-types"

const Header = (props) => {
    const {heading=""} = props
    const router = useRouter()
    const [userName, setUserName] = useState("User")
    useEffect(()=>{
        const name = localStorage.getItem(LOCAL_STORAGE_USER_NAME)
        if(!name) {
            router.push(ROUTES.login)
        }
        setUserName(name)
    },[])

    const handleLogout = useCallback(()=>{
        localStorage.clear()
        router.push(ROUTES.login)
    },[])

    return (
        <div className=" w-full flex justify-between items-center border-b-2 border-indigo-500 px-4 py-2">
            <h2 className="first-letter:capitalize font-semibold">
            {userName}
            </h2>
            <h1 className="text-[1.5rem] font-bold text-lime-500">
                {heading}
            </h1>
            <Button name="logout" value="" label="Logout" type="button" className="py-1 px-2 text-sm font-semibold font-serif" onClick={handleLogout}  />
        </div>
    )
}

Header.propTypes = {
    heading: PropTypes.string
}

export default Header