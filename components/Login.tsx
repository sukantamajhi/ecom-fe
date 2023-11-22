"use client"
import axios from '@/axios';
import { Checkbox, NextUIProvider } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import crypto from "crypto-js"

const Login = (props: any) => {
  const router = useRouter()
  const searchParam = useSearchParams()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const email = searchParam.get("email")
    let passKey: string = searchParam.get("passkey") ?? ""
    if (searchParam.get("passkey")) {
      const bytes = crypto.AES.decrypt(passKey, "my-proj")
      passKey = bytes.toString(crypto.enc.Utf8)
    }

    if (email && passKey) {
      setFormData({ ...formData, email: email, password: passKey })
    }
  }, [])

  const formClassName = "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const result = await axios.post("/auth/signin", formData)
      localStorage.setItem("token", result.data.access_token)
      router.push("/product")
    } catch (error: any) {
      console.error(error, "<<-- Error in user signup")
    }
  }

  return (
    <NextUIProvider>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='w-full'>
            <img
              loading='eager'
              className="mx-auto h-auto w-10"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  autoComplete="email"
                  required
                  placeholder='john@doe.com'
                  className={formClassName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder='Please enter your password'
                  className={formClassName}
                  onChange={handleChange}
                />

                <div className='mt-2 flex justify-between items-center'>
                  <div className='text-sm'>
                    <Checkbox size='sm' onChange={() => setShowPassword(!showPassword)} isSelected={showPassword}>Show Password</Checkbox>
                  </div>

                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500 select-none">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-sm mt-2 text-end">
            <Link href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
              <p>Dont have account? Sign up</p>
            </Link>
          </div>
        </div>
      </div>
    </NextUIProvider>
  )
};

export async function getServerSideProps() {
  try {
    console.log("This block called")
    const response = await axios.get('/users');
    const users = response.data; // Assuming your data is in the "data" property of the response

    console.log(users, '<<-- response.data');

    return { props: { users } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { users: null } };
  }
}

export default Login;