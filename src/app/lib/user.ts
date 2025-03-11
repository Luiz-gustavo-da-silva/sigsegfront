
import axios from 'axios';
import { User } from 'next-auth';
import { LoginData } from '../core/models/login-interface';

const API_BASE_URL = 'http://localhost:3000/api/auth';

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