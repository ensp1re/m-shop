'use client'

import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/input";
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "@/app/components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";


interface LoginFormProps {
    currentUser: SafeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {

    const router = useRouter()

    useEffect(() => {
        if(currentUser) {
            router.push('/cart')
            router.refresh()
        }
    }, [])

    const [isLoading, SetIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }

    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        SetIsLoading(true);


        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback: any) => {
            SetIsLoading(false)
            if (callback?.ok) {
                router.push("/cart");
                router.refresh();
                toast.success("Logged In!")
            }

            if (callback?.error) {
                toast.error(callback.error)
            }
        }).catch(
            () => toast.error("Something went wrong!")
        )
    };

    if (currentUser){
        return <p className="text-center">Logged in. Redirecting...</p> 
    }

    return (
        <>
            <Heading title="Sign in to Matrick Shop" />
            <Button outline icon={AiOutlineGoogle} label={"Sign in with Google"} onClick={() => {
                signIn('google')
            }} />
            <hr className={"bg-slate-300 w-full h-px"} />

            <Input id={"email"} label={"Email"} disabled={isLoading} register={register} errors={errors}
                required />

            <Input type={"password"} id={"password"} label={"Password"} disabled={isLoading} register={register}
                errors={errors}
                required />
            <Button label={isLoading ? "Loading" : "Log in"} onClick={handleSubmit(onSubmit)} />
            <p className={"text-sm"}>
                Do not have an account?  <Link className={"underline"} href={"/register"}>Register</Link>
            </p>
        </>
    )
}

export default LoginForm;