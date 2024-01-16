'use client'

import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/input";
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Button from "@/app/components/Button";
import Link from "next/link";

import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";


interface RegisterFormProps {
    currentUser : SafeUser | null;
}


const RegisterForm: React.FC<RegisterFormProps> = ({currentUser}) => {

    const router = useRouter()


    useEffect(() => {
        if (currentUser) {
            router.push('/cart')
            router.refresh()
        }
    })


    const [isLoading, SetIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',

        }

    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        SetIsLoading(true);

        axios.post('/api/register', data).then(
            () => {
                toast.success('Account created')

                signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,

                }).then((callback: any) => {
                    if (callback?.ok) {
                        router.push('/cart')
                        router.refresh()
                        toast.success("Logged in")
                    }
                    if (callback?.error) {
                        toast.error(callback.error)
                    }
                });
            }
        ).catch(
            () => toast.error("Something went wrong!")
        ).finally(
            () => SetIsLoading(false)
        );




    };

    if (currentUser) {
        return <p className="text-center">Logged in. Redirecting...</p>
    }

    return (
        <>
            <Heading title="Sign up for Matrick Shop" />
            <Button outline icon={AiOutlineGoogle} label={"Continue with Google"} onClick={() => {
                signIn('google')
            }} />
            <hr className={"bg-slate-300 w-full h-px"} />
            <Input id={"name"} label={"Name"} disabled={isLoading} register={register} errors={errors}
                required />

            <Input id={"email"} label={"Email"} disabled={isLoading} register={register} errors={errors}
                required />

            <Input type={"password"} id={"password"} label={"Password"} disabled={isLoading} register={register}
                errors={errors}
                required />
            <Button label={isLoading ? "Loading" : "Sign Up"} onClick={handleSubmit(onSubmit)} />
            <p className={"text-sm"}>
                Already have an account? <Link className={"underline"} href={"/login"}>Log in</Link>
            </p>
        </>
    )
}

export default RegisterForm;