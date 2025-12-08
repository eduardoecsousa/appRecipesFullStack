import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  acessToken: string | null;
  setAcessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [acessToken, setAcessToken] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{acessToken, setAcessToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}