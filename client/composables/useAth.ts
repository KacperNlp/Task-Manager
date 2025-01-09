export function useAuth() {
    const login = async (email: string, password: string) => {
        try {
            const res = $fetch('http://localhost:8080/login', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            return res;
        } catch (error) {
            console.error("Login Error:", error);
        }
    }

    const register = async (email: string, password: string) => {
        try {
            const res = $fetch('http://localhost:8080/register', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            return res;
        } catch (error) {
            console.error("Register Error:", error);
        }
    }

    return {  login, register };
}