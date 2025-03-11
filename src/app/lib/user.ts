
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/auth';

interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}
  
export async function findUserByCredentials(email: string, password: string): Promise<User | null> {

    const login: LoginData = {
        email: email,
        password: password,
    };

    try {
        const response: any = await axios.post(`${API_BASE_URL}/login`, login, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data.user;
    } catch (error: any) {
        return null;
    }

}