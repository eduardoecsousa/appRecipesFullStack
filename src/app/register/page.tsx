'use client'
import React from 'react'

export default function page() {
  const [error, setError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [dateOfBirth, setDateOfBirth] = React.useState("")
  const [role, setRole] = React.useState("user")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Lógica para registrar o usuário
    const userData = {
      name,
      email,
      password,
      phone,
      dateOfBirth,
      role
    };

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      window.location.href = "/login"
    } else {
      const data = await response.json()
      setError(data.message || "Erro ao fazer login. Tente novamente.")
    }

    setIsLoading(false);
  }
  return (
    <div className='flex h-screen items-center justify-center'>
      <form action="" className="flex w-80 flex-col gap-4">
        <label htmlFor="name">
          <p>Nome</p>
          <input type="text" id="name" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label htmlFor="email">
          <p>E-mail</p>
          <input type="email" id="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          <p>Senha</p>
          <input type="password" id="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label htmlFor="phone">
          <p>Telefone</p>
          <input type="tel" id="phone" placeholder="(99) 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label htmlFor="dateOfBirth">
          <p>Data de Nascimento</p>
          <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </label>
        <label htmlFor="role">
          <p>Função</p>
          <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">Usuário</option>
          </select>
        </label>
        <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Carregando..." : "Criar conta"}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  )
}
