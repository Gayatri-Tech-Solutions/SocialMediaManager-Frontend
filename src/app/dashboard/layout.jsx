"use client"
import { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DashboardRootLayout({ children }) {
  const router = useRouter()
  const [checkingLogin,setCheckingLogin] = useState(true)

  useEffect(()=>{
    if(!localStorage.getItem("loggedIn") && localStorage.getItem("loggedIn") != true){
      toast.error("Please login first", { id: "login_error" });
        router.push('/home')
    }else{
      setCheckingLogin(false)
    }
  },[])

  if(checkingLogin) return null
  return <DashboardLayout>{children}</DashboardLayout>;
}