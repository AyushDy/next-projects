"use client";
import { useEffect, useState } from "react"

export default function Toaster({text, onClose}:{text:string;onClose:()=>void}){
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setVisible(false);
            onClose();
        },3000);
        return ()=>clearTimeout(timer);
    });

    if(!visible) return null;

    return (
        <div className="p-2 h-fit z-50 w-fit fixed bottom-8 right-4 bg-black text-white rounded shadow-lg animate-toast-in">
            {text}
        </div>
    )
}