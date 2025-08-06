"use client";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function ToastPortal({
  children,
}: {
  children: React.ReactNode;
}){
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
    setMounted(true);
  },[])

  if(!mounted){
    return null;
  }

  const toastRoot = document.getElementById("toast-root");
  if (!toastRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    children,
    toastRoot
  );
}
