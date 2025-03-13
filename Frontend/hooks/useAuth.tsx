import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}

