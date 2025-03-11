'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signIn } from '../../../../auth'

export default async function loginAction(_prevState: any, formData: FormData) {
   
    try{
        await signIn('credentials', {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            redirect: true,
            redirectTo: '/dashboard'
        });
        return{
            success: true,
            message: 'Login efetuado com sucesso!'
        }
    }catch(e: any){

        if(isRedirectError(e)){
            throw e;
        }

        if(e.type === 'CredentialsSigninError'){
            return {
                success: false,
                message: 'Suas credenciais estão incorretas'
            }
        }
        return {
            success: false,
            message: 'Ops, algo deu errado. Tente novamente mais tarde'
        }

        
    }

}