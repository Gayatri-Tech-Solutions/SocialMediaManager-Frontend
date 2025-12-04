"use client"
import { appCountBasedNavigation, isLoggedIn } from "@/helper/utils";
import { useEffect, useState } from "react";
const PostsPage = () => {
    const [loggedIn,setLoggedIn] = useState(false)
    const [appsCount,setAppsCount] = useState(false)
  
    useEffect(()=>{
      console.log("in analytics page useeffect")
      setAppsCount(localStorage.getItem("socialMediaAppsTokensCount"))
      setLoggedIn(localStorage.getItem("loggedIn"))
      isLoggedIn
      appCountBasedNavigation
    },[])
  
  
  
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Manage Posts</h2>
      <p className="text-gray-400">Post management interface coming soon...</p>
    </div>
  );
};

export default PostsPage;