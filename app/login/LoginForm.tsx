
"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    //console.log(data)

    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged In");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  }

  return (
    <>
      <Heading title="Sign in to ElectroSwift" />
      
      <Button label="Continue with Google" outline icon={AiOutlineGoogle} onClick={() => {}}/>

      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />

      <Button label={isLoading ? "Loading" : "Login"} onClick={handleSubmit(onSubmit)}/>

      <p className="text-sm">
        Do not have an account? <Link href="/register" className="underline">Sign Up</Link>
      </p>
    </>
  );
};

export default LoginForm
