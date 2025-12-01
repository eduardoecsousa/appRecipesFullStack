"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string | null>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/reset-password/${token}`);
        const data = await res.json();

        if (data?.userId) setUserId(data.userId);
      } catch (error) {
        setUserId(null);
      } finally {
        setLoading(false);
      }
    }

    async function fetchDelete() {
      try {
        await fetch("/api/reset-password", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
      } catch (error) {
        console.error("Error deleting token:", error);
      }
    }

    if (token) fetchData();
    // if (!userId) fetchDelete();
  }, [token]);

  if (loading) return <p>Carregando…</p>;

  if (!userId) {
    return (
      <div>
        <h1>Token Inválido ou Expirado</h1>
        <p>O link para redefinir a senha é inválido ou expirou. Por favor, solicite um novo link.</p>
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, newPassword, token }),
    });

    if (res.ok) {
      alert("Senha atualizada com sucesso!");
      window.location.href = "/login";
    } else {
      alert("Erro ao atualizar a senha.");
    }
  };

  return (
    <div>
      <h1 >Redefinir Senha</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="userId" value={userId} />
        <div>
          <label htmlFor="newPassword">Nova Senha:</label>
          <input className="border border-gray-300 p-2 rounded" type="password" id="newPassword" name="newPassword" required onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Atualizar Senha</button>
      </form>
    </div>
  );
}
