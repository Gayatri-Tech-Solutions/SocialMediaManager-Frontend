"use client";

import {
  LayoutDashboard,
  Send,
  BarChart3,
  Settings,
  Users,
  Calendar,
  FileText,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Link as LinkIcon
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import { appCountBasedNavigation, isLoggedIn } from "@/helper/utils";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(null);
  const [appsCount, setAppsCount] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

 
 useEffect(() => {
    setShowDashboard(false)
    isLoggedIn
    
    appCountBasedNavigation
    setShowDashboard(true)
  }, []);

  

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "posts", label: "Posts", icon: Send, path: "/dashboard/posts" },
    { id: "analytics", label: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
    { id: "schedule", label: "Schedule", icon: Calendar, path: "/dashboard/schedule" },
    { id: "accounts", label: "Connected Accounts", icon: LinkIcon, path: "/dashboard/accounts" },
  ];

  const bottomNavigation = [
    { id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" },
    { id: "help", label: "Help & Support", icon: HelpCircle, path: "/dashboard/help" },
  ];

  const getActiveTab = () => {
    return navigation.find(item => pathname === item.path)?.id || 
           bottomNavigation.find(item => pathname === item.path)?.id || 
           "dashboard";
  };

  const logout = () =>{
    console.log("i am in logout")
    localStorage.clear()
    router.push("/home")
  }

  const activeTab = getActiveTab();

  return (
    <>
    {showDashboard?
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-800 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Send className="w-8 h-8 text-yellow-600" />
              <span className="text-xl font-bold">PostHub</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                activeTab === item.id 
                  ? "bg-yellow-600 text-black font-semibold" 
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          {bottomNavigation.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                activeTab === item.id 
                  ? "bg-yellow-600 text-black font-semibold" 
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
          
          {/* Logout */}
          <button onClick={logout} className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-400 hover:text-white transition">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold capitalize">
                {navigation.find(item => item.id === activeTab)?.label || 
                 bottomNavigation.find(item => item.id === activeTab)?.label || 
                 "Dashboard"}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-600 transition w-64"
                />
              </div>
              
              {/* Notifications */}
              <button className="p-2 hover:bg-gray-700 rounded-lg transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                  <span className="font-bold text-black">U</span>
                </div>
                {sidebarOpen && (
                  <div>
                    <p className="text-sm font-semibold">User Name</p>
                    <p className="text-xs text-gray-400">user@email.com</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
    :
    <Loader/>
    }
    </>
  );
};

export default DashboardLayout;