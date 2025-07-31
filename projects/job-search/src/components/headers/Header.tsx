"use client";
import { Inter } from "next/font/google";
import SearchField from "../SearchField";
import { useEffect, useState } from "react";
import HeaderNavLinks from "../UI/navs/HeaderNavLinks";


const inter = Inter({
  subsets: ['latin'],
  weight : ['400', '600', '700'],
  variable: '--font-inter',
})


export default function Header(){
    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(()=>{
        
    },[])

    return (
        <>
        <div className={`h-20 fixed z-50 w-full px-5 flex justify-evenly items-center bg-black/10 backdrop-blur-3xl text-secondary `}>
            <h1 className={`mr-auto font-extrabold text-5xl ${inter.variable}`}>JOBFLY</h1>
            <SearchField />
            <HeaderNavLinks />
        </div>
        </>
    )
}