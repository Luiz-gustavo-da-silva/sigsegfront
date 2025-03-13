"use client";

import Form from "next/form";
import loginAction from "./loginAction";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <>
      {state?.success === false && (
        <div
          className="bg-red-100 mb-6 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{state?.message}</span>
        </div>
      )}

      {state?.success === true && (
        <div
          className="bg-green-100 mb-6 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Sucesso! </strong>
          <span className="block sm:inline">{state?.message}</span>
        </div>
      )}

      <Form className="space-y-4" action={formAction}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="exemplo@gmail.com"
            name="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                "
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md bg-[#3065ac] text-white  transition"
        >
          Log in
        </button>
      </Form>
    </>
  );
}
