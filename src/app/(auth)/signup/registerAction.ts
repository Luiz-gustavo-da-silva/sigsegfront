'use server'
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/auth';

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export default async function registerAction(_prevState: any, formData: FormData) {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries);

    if (!data.email || !data.name || !data.password) {
        return {
            message: 'Preencha todos os campos',
            success: false,
        }
    }

    const registration: RegisterData = {
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, registration, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return {
            message: 'Usuário criado com sucesso!',
            success: true,
        }
    } catch (error: any) {
        return {
            message: error.response?.data?.message || 'Erro ao cadastrar usuário',
            success: false,
        }
    }
}
