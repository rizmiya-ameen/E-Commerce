"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);



  // Destructuring properties from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    // Setting default values for form fields
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  // Define a function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
    setIsLoading(true);

    // console.log(data);

    // Make a POST request to the 'api/register' endpoint with the form data
    fetch("api/register", {
      method: "POST", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Specify that the request contains JSON data
      },
      body: JSON.stringify(data), // Convert form data to JSON and send it in the request body
    })
      .then(() => {
        // Display a success toast when the account is created
        toast.success("Account created");

        // Sign in the user using the 'credentials' provider
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          // If sign-in is successful, redirect to '/cart' and refresh the page
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Logged In");
          }

          // If there is an error during sign-in, display an error toast
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("Something went wrong")) // Display an error toast if there's an issue with the POST request
      .finally(() => {
        // Set loading state back to false regardless of success or failure
        setIsLoading(false);
      });
  };


  return (
    <>
      <Heading title="Sign up for ElectroSwift" />

      <Button
        label="Sign Up with Google"
        outline
        icon={AiOutlineGoogle}
        onClick={() => {}}
      />

      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

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

      <Button
        label={isLoading ? "Loading" : "Sign-Up"}
        onClick={handleSubmit(onSubmit)}
      />

      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log In
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;

/*
const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    //console.log(data)

    axios postMessage('api/register', data).then(() => {
      toast.success('Account created')
      
      signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      }).then ((callback) => {
        if(callback?.ok) {
          router.push('/cart')
          router.refresh()
          toast.success('Logged In')
          
        }

        if (callback?.error) {
          toast.error(callback.error)
        }
      })
    })
  }

*/

/*

// const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FieldValues>({
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     password: "",
  //   },
  // });

  // const router = useRouter();

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   setIsLoading(true);
  //   //console.log(data);

  //   fetch("api/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then(() => {
  //       toast.success("Account created");

  //       signIn("credentials", {
  //         email: data.email,
  //         password: data.password,
  //         redirect: false,
  //       }).then((callback) => {
  //         if (callback?.ok) {
  //           router.push("/cart");
  //           router.refresh();
  //           toast.success("Logged In");
  //         }

  //         if (callback?.error) {
  //           toast.error(callback.error);
  //         }
  //       });
  //     })
  //     .catch(() => toast.error("Something went wrong"))
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  */
