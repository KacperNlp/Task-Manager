import type { RegisterUser } from '../types/types'

export function useAuth() {
    const toast = useToast();

    const login = async (email: string, password: string) => {
        try {
            const res = await $fetch<{ success?: boolean }>('http://localhost:8080/login', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            console.log(res);
            return res?.success;
        } catch (error: any) {
            errorHandler(error);
        }
    }

    const register = async (userData: RegisterUser) => {
        try {
            const res = await $fetch<{ success?: boolean }>('http://localhost:8080/register', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            return res?.success;
        } catch (error: any) {
            errorHandler(error);
        }
    }

    const logout = async () => {
        try {         
            const res = await $fetch<{ success?: boolean }>('http://localhost:8080/logout', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return res?.success;
        } catch (error: any) {
            errorHandler(error);
        }
    }

    const errorHandler = (error: any) => {
        const message = error.response?._data?.message ? error.response._data.message : "Something went wrong";
        toast.add({
            title: "Error",
            description: message,
            color: "red",
        });

        throw new Error(message);
    }

    return {  login, register, logout };
}