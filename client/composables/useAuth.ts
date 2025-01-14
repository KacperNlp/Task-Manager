export function useAuth() {
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

            return res?.success;
        } catch (error) {
            console.error("Login Error:", error);
        }
    }

    const register = async (email: string, password: string) => {
        try {
            const res = await $fetch<{ success?: boolean }>('http://localhost:8080/register', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            return res?.success;
        } catch (error) {
            console.error("Register Error:", error);
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
        } catch (error) {
            console.error("Logout Error:", error);
        }
    }

    return {  login, register, logout };
}