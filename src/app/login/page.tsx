"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { useAuth } from "@/context/auth/authContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { setAcessToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    setIsLoading(false) 
    if (response.ok) {
      setAcessToken((await response.json()).accessToken);
      window.location.href = "/"
    } else {
      const data = await response.json()
      setError(data.message || "Erro ao fazer login. Tente novamente.")
    }
  }

  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <form action="" className="flex w-80 flex-col gap-4">
          <label htmlFor="email">
            <p>E-mail</p>
            <input type="email" id="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label htmlFor="password">
            <p>Senha</p>
            <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Esqueceu sua senha?
          </Link>
          <button type="submit" disabled={isLoading} onClick={handleSubmit} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50">
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
          <Link href="/register" className="mt-4 text-center text-blue-500 hover:underline">
            Não tem uma conta? Registre-se
          </Link>
        </form>


      </div>
      {error && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2" role="alert">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
