"use client"

import React, { useCallback, useMemo } from "react"
import styles from "./loginform.module.scss"
import clsx from "clsx"
import TextInput from "@/components/shared/input/textInput/TextInput"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from "@/components/shared/button/Button";
import { useRouter } from 'next/navigation'
import { ROUTES } from "@/utils/constants/routerConstants"
import AuthService from "@/app/api/auth/auth"

const SignUpForm = () => {

    const router = useRouter()

    const formOptions = useMemo(() => {
        // form validation rules
        const validationSchema = Yup.object().shape({
            username: Yup.string().min(3, "Minimum 3 characters required.").max(20, "Maximum 20 characters required").required("User name is required."),
            email: Yup.string().email("Please enter correct email.").required("Email is required."),
            password: Yup.string().min(6, "Minimum 6 characters required.").required("Password is required.")
        })
        return { resolver: yupResolver(validationSchema) }
    }, [])

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm({ ...formOptions, mode: "onSubmit" });
    const { errors } = formState;

    const handleFormSubmit = useCallback(async (data) => {
        console.log("data === ", data)
        const payload = {
            "name": data.username,
            "email": data.email,
            "password": data.password
        }
        const result = await AuthService.signup(payload)
        console.log("signup_response = ", result)
        // localStorage.setItem(LOCAL_STORAGE_USER_NAME, data.username);
        // router.push(ROUTES.signup);
    }, [router])

    return (
        <section className={clsx(styles["login-section-wrapper"], "bg-red")}>
            <div>
                <h2 className="text-green-300 font-medium text-center text-[1.5rem]">Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="gap-2">
                <TextInput name="username" register={register} label="Username" classes={{ root: "my-[1rem]" }} 
                error={errors?.username?.message}
                />
                <TextInput name="email" register={register} label="Email" classes={{ root: "my-[1rem]" }} 
                error={errors?.email?.message}
                />
                <TextInput name="password" register={register} label="Password" classes={{ root: "my-[1rem]" }} 
                error={errors?.password?.message}
                />
                <Button name="submit" value="submit" label="Submit" type="submit" className=" my-[1rem]" />
            </form>

        </section>
    )
}

export default SignUpForm