"use client"

import React, { useCallback, useMemo } from "react"
import styles from "./loginform.module.scss"
import clsx from "clsx"
import TextInput from "@/components/shared/input/textInput/TextInput"
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from "@/components/shared/button/Button";
import { useRouter } from 'next/navigation'
import { LOCAL_STORAGE_USER_NAME } from "@/utils/constants/storageConstants"
import { ROUTES } from "@/utils/constants/routerConstants"

const LoginForm = () => {

    const router = useRouter()

    const formOptions = useMemo(() => {
        // form validation rules
        const validationSchema = Yup.object().shape({
            username: Yup.string().min(3, "Minimum 3 characters required.").max(20, "Maximum 20 characters required").required("User name is required."),
            password: Yup.string().min(6, "Minimum 6 characters required.").required("Password is required.")
        })
        return { resolver: yupResolver(validationSchema) }
    }, [])

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm({ ...formOptions, mode: "onSubmit" });
    const { errors } = formState;

    const handleFormSubmit = useCallback((data) => {
        localStorage.setItem(LOCAL_STORAGE_USER_NAME, data.username);
        router.push(ROUTES.library);
    }, [router])

    const navigateToSignUp = useCallback(()=>{
        router.push(ROUTES.signup)
    },[])

    return (
        <section className={clsx(styles["login-section-wrapper"], "bg-red")}>
            <div>
                <h2 className="text-green-300 font-medium text-center text-[1.5rem]">Login</h2>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="gap-2">
                <TextInput name="username" register={register} label="Username" classes={{ root: "my-[1rem]" }} 
                error={errors?.username?.message}
                />
                <TextInput name="password" register={register} label="Password" classes={{ root: "my-[1rem]" }} 
                error={errors?.password?.message}
                />
                <div className="flex justify-between items-center my-[1rem]">
                    <Button name="submit" value="submit" label="Submit" type="submit" className="" />
                    <Button name="signup" value="signup" label="Signup" type="button" className="" onClick={navigateToSignUp} />
                </div>
                
            </form>

        </section>
    )
}

export default LoginForm