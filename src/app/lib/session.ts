'use server';

import { auth } from "../../../auth"

export async function sessionIdUser():Promise<number> {
    const session = await auth()
    return Number(session?.user?.id)
}