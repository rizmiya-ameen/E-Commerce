"use client"

import { useState } from "react"
import Input from "@/components/inputs/Input"

const RegisterForm = () => {

  const { isLoading, setIsLoading } = useState(false)
  return (
    <div>
      <h2>RegisterForm</h2>

      <Input 
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  )
}

export default RegisterForm