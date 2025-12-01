"use client";

import React from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/users/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      console.log("Password reset link sent to your email.");
    } else {
      console.log(response)
      console.error(response.statusText);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-80">
        <h2 className="mb-4 text-2xl font-bold">Recuperar Senha</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="email">
            <p>E-mail</p>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Enviar link de recuperação
          </button>
        </form>
      </div>
    </div>
  );
}
