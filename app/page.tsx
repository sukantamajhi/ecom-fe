'use client'

import axios from '@/axios';
import { NextUIProvider } from '@nextui-org/react'
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)

  const formClassName = `block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      const result = await axios.post("/auth/signup", formData)
      console.log(result.data, "<<-- result.data")
    } catch (error: any) {
      console.error(error, "<<-- Error in user signup")
    }
  }

  return (
    <NextUIProvider>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="My project"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder='Enter your name'
                  className={formClassName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder='john@doe.com'
                  className={formClassName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  placeholder='Enter your phone no'
                  className={formClassName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder='Enter your address'
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
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder='Please enter your password'
                  className={formClassName}
                  onChange={handleChange}
                />
                <div className='mt-2'>
                  <input
                    id="check"
                    type="checkbox"
                    checked={showPassword}
                    onChange={(e) => setShowPassword((prev) => !prev)}
                  />
                  <label htmlFor="check" className='text-sm ml-1 text-gray-500'>Show Password</label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="text-sm mt-2 text-end">
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Already have account? Sign in
            </Link>
          </div>

        </div>
      </div>
    </NextUIProvider>
  )
}
