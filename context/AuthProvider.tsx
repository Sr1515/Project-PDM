import { createContext, useEffect, useState } from 'react';
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { Href, router } from 'expo-router';
import { api } from '@/api/axios';

interface IContexto {
    tokenState: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkToken: Function
}

export const AuthContext = createContext({} as IContexto);

interface IProps {
    children: React.ReactNode;
}

export function AuthProviderContext({ children }: IProps) {
    const [tokenState, setTokenState] = useState<string | null>(null);

    async function login(email: string, password: string) {
        const dados = { email, password };

        try {
            const response = await api.post('/auth', dados);

            if (response.data.error) {
                throw new Error('Credenciais inválidas');
            }

            const { token } = response.data as { token: string, name: string };
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;

            await AsyncStorage.setItem('token', token);

            setTokenState(token);
            router.replace('/home');

        } catch (error) {
            throw error;
        }
    }

    async function logout() {
        try {
            setTokenState(null);
            await AsyncStorage.removeItem('token');

            axios.defaults.headers.common.Authorization = null;
            router.replace('/login');

        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const tokenStorage = await AsyncStorage.getItem('token');

                if (tokenStorage) {
                    axios.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
                    setTokenState(tokenStorage);
                }
            } catch (error) {
                console.error('Erro ao recuperar o token do AsyncStorage:', error);
            }
        })();
    }, []);

    function checkToken(namePage: Href) {
        useEffect(() => {
            (async () => {
                const tokenStorage = await AsyncStorage.getItem('token');

                if (tokenStorage && tokenStorage !== null) {
                    try {
                        const data = await api.get("/", {
                            headers: {
                                Authorization: `Bearer ${tokenStorage}`,
                            },
                        });

                        if (data && data.status === 200) {
                            if (!namePage) {
                                return
                            }

                            router.replace(namePage);
                        }
                    } catch (e) {
                        console.error("Erro ao verificar o token:", e);
                        router.replace("/login");
                    }
                }

            })()
        }, [])

    }

    return (
        <AuthContext.Provider value={{ tokenState, login, logout, checkToken }}>
            {children}
        </AuthContext.Provider>
    );
}
