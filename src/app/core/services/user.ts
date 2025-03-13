
import axios from 'axios';
import { User } from 'next-auth';
import { LoginData } from '../models/login-interface';
import { cookies } from 'next/headers';

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


        if(response.status !== 200) return null;
        
        const authData = response.data;
      
        if(!authData.token || !authData.user) return null;
        
        (await cookies()).set("token", authData.token)

        return authData.user;
    } catch (error: any) {
        return null;
    }

}