"use server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
const JWT_SECRET = new TextEncoder().encode("abcdefadawdadwadawdawdawd");

export async function signJWT(payload : any, expiresIn = "1d"){
    const token = await new SignJWT(payload)
    .setProtectedHeader({alg : "HS256"})
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
    return token;
}

export async function verifyJWT(token:string){
    try{
        const {payload} = await jwtVerify(token, JWT_SECRET);
        return payload;
    }catch(err){
        console.log("verify error");
        return null;
    }
}

export async function getCurrentUser(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value as string
    if (!token) {
        return null;
    }
    const payload = await verifyJWT(token);
    return payload;
}