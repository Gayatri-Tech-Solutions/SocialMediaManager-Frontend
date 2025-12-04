"use client";
import Navbar_comp from "./navbar";
import { useRouter } from "next/navigation";
import { Activity, useEffect, useState } from "react";
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
import {
  Twitter,
  Facebook,
  Camera,
  PlugZap,
  Send,
  LayoutDashboard,
  Edit,
  Users,
  Target,
  Zap,
  Sparkles,
  Mail,
  Phone,
  MessageCircle,
  Check,
  X,
  Star,
  Eye,
  EyeOff,
  Calendar,
  User,
  VenusAndMars,
} from "lucide-react";
import axios from "axios";
import Loader from "./loader";
import { isSocialMediaCountMoreThanOne } from "@/helper/utils";
import toast from "react-hot-toast";

const LandingPage = () => {
  const [isShowingLogin, setIsShowingLogin] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading,setShowLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    dob: false,
    password: false,
  });
  const router = useRouter()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateData = async(formData, type) => {
    let flag = true;
    if (type == "signup") {
      if (formData.name.length > 20 || formData.name.length < 2) {
        setErrors(prev => ({...prev, name: true}));
        flag = false;
      } else {
        setErrors(prev => ({...prev, name: false}));
      }

      

      const phoneRegex = /^[6-9]\d{9}$/;
      if (phoneRegex.test(formData.phone.trim())) {
        setErrors(prev => ({...prev, phone: false}));
      } else {
        setErrors(prev => ({...prev, phone: true}));
        flag = false;
      }

      const birth = new Date(formData.dob);
      const today = new Date();
      const eighteenth = new Date(
        birth.getFullYear() + 18,
        birth.getMonth(),
        birth.getDate()
      );
      if (today < eighteenth) {
        setErrors(prev => ({...prev, dob: true}));
        flag = false;
      } else {
        setErrors(prev => ({...prev, dob: false}));
      }
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(formData.email)) {
      setErrors(prev => ({...prev, email: false}));
    } else {
      setErrors(prev => ({...prev, email: true}));
      flag = false;
    }

    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (passwordRegex.test(formData.password)) {
      setErrors(prev => ({...prev, password: false}));
    } else {
      setErrors(prev => ({...prev, password: true}));
      flag = false;
    }

    return flag;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    let flag =await  validateData(formData, "signup") 
    if(flag){
      try {
        try{
          let response = await axios.post(`${backend_url}/signup`, formData);
          }catch(err){
          console.log("eerori in signup")
          toast.error("Server not responding, Please try again after sometime", {id: "signup_server_error"});
          console.log(err)
          setTimeout(()=>{
          setShowLoading(false);
        },100)
        }
        setIsSignUpOpen(false);
        setIsLoginOpen(true);
        setTimeout(()=>{
          setShowLoading(false);
        },100)
      } catch (err) {
        console.log("error in signup")
        toast.error("Something went wrong,Please try again after sometime", {id: "signup_error"});
        if(err?.response?.data?.error){
          setErrors(err.response.data.error)
        }
        setTimeout(()=>{
          setShowLoading(false);
        },1000)
      }
    }else{
      setShowLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login data:", {
      email: formData.email,
      password: formData.password,
    });
    setShowLoading(true);
    let loginData = {
            email: formData.email,
            password: formData.password
    }
    let flag =await  validateData(loginData, "login") 
    if(flag){
      try {
          let response = await axios.post(`${backend_url}/login`, loginData);
                // setIsLoginOpen(false);
        
        localStorage.setItem("loggedIn",true)
        
        let appsCount = Object.keys(response.data.data.social_media_app_tokens).length
        localStorage.setItem("socialMediaAppsTokensCount",appsCount)
        
        if(appsCount<1){
          router.push("/dashboard/accounts")
        }else{
          window.location.href ="/dashboard"
        }

      } catch (err) {
        if (err.code === "ERR_NETWORK") {
    toast.error("Server not responding. Please try again later.", {
      id: "login_server_error",
    });
    console.log("Network error:", err);
  }

  // 🔹 Server returned an error response
  else if (err.response) {
    console.log("Backend error:", err.response.data.error);
    setErrors(err.response.data.error);
  }

  // 🔹 Unknown error
  else {
    console.log("Unknown error:", err);
    toast.error("Something went wrong.");
  }
        
      } finally{
        setTimeout(()=>{
          setShowLoading(false);
        },1000)
      }
    }
    
  };
  

  const handleFormOpen = (page) => {
    let loggedIn = localStorage.getItem("loggedIn")
    if(loggedIn == "true"){
        console.log("in logged in ",loggedIn)
        if (localStorage.getItem("socialMediaAppsTokensCount") && localStorage.getItem("socialMediaAppsTokensCount") == "0"){
          toast.error("Please connect at least 1 social media platform", { id: "apps_error" });
          router.push("/dashboard/accounts");
          return null
        }
        router.push("/dashboard")
      }else{
        
        console.log("in logged in ",loggedIn)
      if (page == "signup") {
        setIsShowingLogin(true);
        setIsLoginOpen(false);
        setIsSignUpOpen(true);
      } else if (page == "login") {
        setIsShowingLogin(true);
        setIsSignUpOpen(false);
        setIsLoginOpen(true);
      }
    }
  };


  return (
    <>
      <Navbar_comp />

        {showLoading?
        
        <Loader></Loader>
       :
          <div className="text-white bg-black">
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-black text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
              Manage All Your Social Media Posts.{" "}
              <span className="text-yellow-600">One Click.</span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              PostHub unifies your social platforms—Twitter, Facebook, and
              Instagram—allowing you to create, update, and control every post
              from one smart dashboard.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href ="#login_section"
                className="px-8 py-3 bg-yellow-600 text-black font-bold text-lg rounded-xl shadow-xl hover:bg-yellow-500 transition cursor-pointer"
              >
                Start Your Free Trial
              </a>
              <a
                href="#features"
                className="px-8 py-3 text-yellow-600 font-bold text-lg rounded-xl border-2 border-yellow-600 hover:border-yellow-500 hover:text-yellow-500 transition cursor-pointer"
              >
                See Features
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 relative overflow-hidden bg-gray-950"
        >
          <div className="max-w-6xl mx-auto px-4 relative z-10 ">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-yellow-600" />
                  <span className="text-yellow-600 font-semibold">
                    Our Story
                  </span>
                </div>

                <h2 className="text-4xl font-bold">
                  Built for <span className="text-yellow-600">Creators</span>,
                  by Creators
                </h2>

                <p className="text-lg text-gray-300 leading-relaxed">
                  PostHub was built to solve a problem every creator faces—too
                  many tabs, too many apps, and too much time wasted managing
                  social media.
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                  We created a platform where content comes first: a single
                  place where you can post, update, and track everything across
                  Twitter, Facebook, and Instagram instantly.
                </p>

                <p className="text-lg text-gray-300 leading-relaxed">
                  At PostHub, we're driven by innovation, simplicity, and a
                  passion for empowering creators to grow without friction.
                </p>

                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-gray-800">
                    <Users className="w-6 h-6 text-yellow-600" />
                    <div>
                      <p className="font-semibold">Built for</p>
                      <p className="text-sm text-gray-400">Creators</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-gray-800">
                    <Zap className="w-6 h-6 text-yellow-600" />
                    <div>
                      <p className="font-semibold">Lightning</p>
                      <p className="text-sm text-gray-400">Fast</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-gray-800">
                    <Target className="w-6 h-6 text-yellow-600" />
                    <div>
                      <p className="font-semibold">Results</p>
                      <p className="text-sm text-gray-400">Driven</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-gray-800">
                    <Send className="w-6 h-6 text-yellow-600" />
                    <div>
                      <p className="font-semibold">One-Click</p>
                      <p className="text-sm text-gray-400">Publish</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Visual Stats */}
              <div className="relative">
                <div className="bg-black/60  rounded-2xl p-8 border border-gray-800 ">
                  <h3 className="text-2xl font-bold text-center mb-8 text-white">
                    Why Creators Love Post
                    <span className="text-yellow-600">Hub</span>
                  </h3>

                  <div className="space-y-6">
                    {/* Stat 1 */}
                    <div className="flex items-center justify-between p-4  rounded-lg border border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                          <Zap className="w-5 h-5 text-yellow-500" />
                        </div>
                        <span className="font-semibold">Time Saved</span>
                      </div>
                      <span className="text-2xl font-bold text-yellow-600">
                        5+ hrs/wk
                      </span>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex items-center justify-between p-4  rounded-lg border border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                          <Send className="w-5 h-5 text-yellow-500" />
                        </div>
                        <span className="font-semibold">Platforms</span>
                      </div>
                      <span className="text-2xl font-bold text-yellow-600">
                        3+
                      </span>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex items-center justify-between p-4  rounded-lg border border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                          <Users className="w-5 h-5 text-yellow-500" />
                        </div>
                        <span className="font-semibold">Active Users</span>
                      </div>
                      <span className="text-2xl font-bold text-yellow-600">
                        10K+
                      </span>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex items-center justify-between p-4  rounded-lg border border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                          <Target className="w-5 h-5 text-yellow-500" />
                        </div>
                        <span className="font-semibold">Engagement</span>
                      </div>
                      <span className="text-2xl font-bold text-yellow-600">
                        +47%
                      </span>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400 mb-3">
                      Join thousands of creators
                    </p>
                    <a
                      href ="#login_section"
                      className="inline-block px-6 py-2 bg-yellow-600 text-black font-bold rounded-lg hover:bg-yellow-500 transition cursor-pointer"
                    >
                      Start Today
                    </a>
                  </div>
                </div>

                {/* Floating Elements */}
                {/* <div className="absolute -top-3 -right-3 bg-yellow-600 text-black px-3 py-1 rounded-full font-bold text-sm shadow-lg rotate-6">
                Trusted
              </div>
              <div className="absolute -bottom-3 -left-3 bg-black text-yellow-600 px-3 py-1 rounded-full font-bold text-sm border border-yellow-600 shadow-lg -rotate-6">
                Simple
              </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section
          id="platforms"
          className="py-16 bg-gray-900 text-center border-t border-gray-800"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">
              Post to the Platforms You Care About
            </h2>
            <p className="text-gray-400 mb-12">
              Seamless integration with your core social networks.
            </p>

            <div className="flex justify-center gap-16">
              <div className="flex flex-col items-center">
                <Twitter className="w-12 h-12 text-yellow-600 mb-2" />
                <span className="text-lg">Twitter</span>
              </div>
              <div className="flex flex-col items-center">
                <Facebook className="w-12 h-12 text-yellow-600 mb-2" />
                <span className="text-lg">Facebook</span>
              </div>
              <div className="flex flex-col items-center">
                <Camera className="w-12 h-12 text-yellow-600 mb-2" />
                <span className="text-lg">Instagram</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-28 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-center mb-4">
              Your Integrated Workflow
            </h2>
            <p className="text-xl text-gray-400 text-center mb-16">
              Everything you need to manage your content lifecycle.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Connect */}
              <div className="text-center p-6 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 hover:border-yellow-500 transition">
                <div className="p-3 inline-block bg-indigo-500/20 rounded-full mb-4">
                  <PlugZap className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Connect & Log In</h3>
                <p className="text-gray-400">
                  Securely link all your accounts (Twitter, Facebook, Instagram)
                  in one session.
                </p>
              </div>

              {/* Publish */}
              <div className="text-center p-6 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 hover:border-yellow-500 transition">
                <div className="p-3 inline-block bg-indigo-500/20 rounded-full mb-4">
                  <Send className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  2. Single-Click Publish
                </h3>
                <p className="text-gray-400">
                  Write content once, and instantly publish across all
                  platforms.
                </p>
              </div>

              {/* Read */}
              <div className="text-center p-6 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 hover:border-yellow-500 transition">
                <div className="p-3 inline-block bg-indigo-500/20 rounded-full mb-4">
                  <LayoutDashboard className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  3. Review & Read Posts
                </h3>
                <p className="text-gray-400">
                  View a unified feed of all your historical posts.
                </p>
              </div>

              {/* Edit */}
              <div className="text-center p-6 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 hover:border-yellow-500 transition">
                <div className="p-3 inline-block bg-indigo-500/20 rounded-full mb-4">
                  <Edit className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  4. Full Post Management
                </h3>
                <p className="text-gray-400">
                  Update, modify, or delete posts from any platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Simple, Transparent{" "}
                <span className="text-yellow-600">Pricing</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Fair pricing based on actual API costs. No hidden fees. Cancel
                anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <p className="text-yellow-600 text-sm mt-2">
                    Perfect for testing
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>50 posts/month total</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Twitter API v2 Free Tier</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Facebook Graph API Basic</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>3 connected platforms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Basic scheduling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-gray-500">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-gray-500">Bulk posting</span>
                  </li>
                </ul>

                <a
                  href ="#login_section"
                  className="w-full block text-center py-3 border-2 border-yellow-600 text-yellow-600 font-bold rounded-xl hover:bg-yellow-600 hover:text-black transition cursor-pointer"
                >
                  Get Started Free
                </a>
              </div>

              {/* Pro Plan - Most Popular */}
              <div className="bg-black rounded-2xl p-8 border-2 border-yellow-600 relative hover:transform hover:scale-105 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-600 text-black px-4 py-1 rounded-full font-bold text-sm flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    MOST POPULAR
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Growth</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <p className="text-yellow-600 text-sm mt-2">
                    Includes API costs
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>5,000 posts/month total</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Twitter API v2 Basic + Facebook Graph API</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>All API fees included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>10 connected platforms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Advanced scheduling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Basic analytics & reports</span>
                  </li>
                </ul>

                <a
                  href ="#login_section"
                  className="w-full block text-center py-3 bg-yellow-600 text-black font-bold rounded-xl hover:bg-yellow-500 transition cursor-pointer"
                >
                  Start Growth Trial
                </a>
              </div>

              {/* Business Plan */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Agency</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">$149</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  <p className="text-yellow-600 text-sm mt-2">
                    Unlimited API access
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>25,000 posts/month total</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Twitter API v2 Elevated + Facebook Premium</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>All API fees included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Unlimited platforms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>AI-powered scheduling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>Advanced analytics & white-label reports</span>
                  </li>
                </ul>

                <a
                  href ="#login_section"
                  className="w-full block text-center py-3 border-2 border-yellow-600 text-yellow-600 font-bold rounded-xl hover:bg-yellow-600 hover:text-black transition cursor-pointer"
                >
                  Start Agency Trial
                </a>
              </div>
            </div>

            <div className="text-center mt-12 text-gray-400">
              <p>
                All plans include secure API connections and cover all platform
                API costs.
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8 text-sm">
                <div className="text-left bg-gray-800 p-6 rounded-xl">
                  <h4 className="font-bold text-yellow-600 mb-3">
                    Twitter API v2 Costs
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Free Tier: 50 posts/month</li>
                    <li>• Basic: $100/month for 10,000 posts</li>
                    <li>• Elevated: $500/month for 50,000 posts</li>
                    <li>• Additional posts: $0.01 per post</li>
                  </ul>
                </div>
                <div className="text-left bg-gray-800 p-6 rounded-xl">
                  <h4 className="font-bold text-yellow-600 mb-3">
                    Facebook Graph API Costs
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Basic: Free for limited usage</li>
                    <li>• Business: $50-200/month based on volume</li>
                    <li>• Premium: $500+/month for high volume</li>
                    <li>• Additional costs for advanced features</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm mt-6">
                * We handle all API complexities and costs - you just focus on
                creating content!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="connect" className="py-20 bg-black">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Get in <span className="text-yellow-600">Touch</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Have questions? We're here to help. Reach out through any
                channel below.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Contact Methods
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-yellow-600 transition group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-600 rounded-lg group-hover:scale-110 transition">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email</h4>
                      <p className="text-gray-400">support@posthub.com</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-yellow-600 transition group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-600 rounded-lg group-hover:scale-110 transition">
                      <MessageCircle className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">WhatsApp</h4>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-yellow-600 transition group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-600 rounded-lg group-hover:scale-110 transition">
                      <Phone className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Phone</h4>
                      <p className="text-gray-400">+1 (555) 987-6543</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-yellow-600 transition group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-600 rounded-lg group-hover:scale-110 transition">
                      <Users className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Social Media</h4>
                      <p className="text-gray-400">DM us anytime</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="rounded-2xl p-8">
                <h4 className="text-xl font-bold mb-6 text-center">
                  Follow Us
                </h4>
                <div className="flex justify-center gap-8">
                  <a className="flex flex-col items-center gap-2 hover:scale-110 transition cursor-pointer">
                    <Twitter className="w-8 h-8 text-yellow-600" />
                    <span className="text-sm">Twitter</span>
                  </a>
                  <a className="flex flex-col items-center gap-2 hover:scale-110 transition cursor-pointer">
                    <Facebook className="w-8 h-8 text-yellow-600" />
                    <span className="text-sm">Facebook</span>
                  </a>
                  <a className="flex flex-col items-center gap-2 hover:scale-110 transition cursor-pointer">
                    <Camera className="w-8 h-8 text-yellow-600" />
                    <span className="text-sm">Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={` bg-gray-950 text-center ${
            isShowingLogin ? "pt-20 pb-5" : "py-20"
          }`}
          id="login_section"
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to simplify your social strategy?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Stop wasting time switching tabs. Start publishing smarter today.
            </p>
            {isShowingLogin ? (
              ""
            ) : (
              <button
                id="signup"
                onClick={() => handleFormOpen("signup")}
                className="signup-animation px-10 py-4 bg-yellow-600 text-black font-bold text-xl rounded-xl shadow-2xl hover:bg-yellow-500 transition cursor-pointer"
              >
                Sign Up Now
              </button>
            )}
          </div>
        </section>

        <Activity mode={isShowingLogin ? "visible" : "hidden"}>
          {/* Sign Up Modal */}
          <div className="w-full bg-gray-950 flex  justify-center pb-20 ">
            <div>
              <div className="w-full flex justify-around max-w-md border border-b-0 bg-black border-yellow-600/30 rounded-t-2xl">
                <div
                  className={`w-1/2  rounded-tl-2xl ${
                    isSignUpOpen ? "bg-black" : "bg-gray-900"
                  }`}
                >
                  <button
                    onClick={() => handleFormOpen("signup")}
                    className={`cursor-pointer w-full text-2xl rounded-tl-2xl py-3 ${
                      isSignUpOpen
                        ? " bg-gray-900 rounded-tr-4xl text-yellow-500"
                        : "bg-black rounded-br-4xl"
                    }`}
                  >
                    Sign up
                  </button>
                </div>

                <div
                  className={`w-1/2 rounded-tr-2xl ${
                    isLoginOpen ? "bg-black" : "bg-gray-900"
                  }`}
                >
                  <button
                    onClick={() => handleFormOpen("login")}
                    className={`cursor-pointer w-full text-2xl rounded-tr-2xl py-3 ${
                      isLoginOpen
                        ? "bg-gray-900 rounded-tl-4xl text-yellow-500"
                        : "bg-black  rounded-bl-4xl"
                    }`}
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="bg-gray-900  rounded-b-2xl  p-8 w-7xl max-w-md border border-yellow-600/30 border-t-0">
                {isSignUpOpen ? (
                  <>
                    {/* signup form */}
                    <form onSubmit={handleSignUp} className="space-y-4 ">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name
                          <span
                            className="text-red-700 text-xl cursor-pointer"
                            title="Required"
                          >
                            &nbsp;*
                          </span>
                        </label>
                        <div className="relative">
                          <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600 transition"
                            placeholder="Enter your full name"
                          />
                        </div>
                        {errors.name ? (
                          <p id="name_err" className="text-red-700 text-sm ">
                            Name Length Should be between 2-20 Characters
                          </p>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                          <span
                            className="text-red-700 text-xl cursor-pointer"
                            title="Required"
                          >
                            &nbsp;*
                          </span>
                        </label>
                        <div className="relative">
                          <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600 transition"
                            placeholder="Enter your email"
                          />
                        </div>
                        {errors.email ? (
                          <p id="email_err" className="text-red-700 text-sm ">
                            Please enter a valid email
                          </p>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                          <span
                            className="text-red-700 text-xl cursor-pointer"
                            title="Required"
                          >
                            &nbsp;*
                          </span>
                        </label>
                        <div className="relative">
                          <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600 transition"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        {errors.phone ? (
                          <p id="name_err" className="text-red-700 text-sm ">
                            Please enter a valid 10 digit number
                          </p>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Date of Birth
                          <span
                            className="text-red-700 text-xl cursor-pointer"
                            title="Required"
                          >
                            &nbsp;*
                          </span>
                        </label>
                        <div className="relative">
                          <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600 transition"
                          />
                        </div>
                        {errors.dob ? (
                          <p id="name_err" className="text-red-700 text-sm ">
                            Age should be more than or equal to 18 Years
                          </p>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Gender
                          <span
                            className="text-red-700 text-xl cursor-pointer"
                            title="Required"
                          >
                            &nbsp;*
                          </span>
                        </label>
                        <div className="relative">
                          <VenusAndMars className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-600 transition appearance-none"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">
                              Prefer not to say
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password
                          <span
                            className="text-red-700 text-xl cursor-pointer"
                            title="Required"
                          >
                            &nbsp;*
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-4 pr-12 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600 transition"
                            placeholder="Create a password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-white transition"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                        {errors.password ? (
                          <div className="text-red-700 text-sm space-y-1">
                            <p>• Min length 8, max length 20</p>
                            <p>• Must contain a special character (!@#$%^&*)</p>
                            <p>• Must contain an uppercase letter</p>
                            <p>• Must contain a lowercase letter</p>
                            <p>• Must contain a number</p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-yellow-600 text-black font-bold rounded-lg hover:bg-yellow-500 transition cursor-pointer"
                      >
                        Create Account
                      </button>
                    </form>
                    <button
                      onClick={() => setIsShowingLogin(false)}
                      className="w-full mt-4 py-3 text-yellow-600 border font-bold rounded-lg cursor-pointer bg-transparent border-yellow-600 hover:text-yellow-500 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <form onSubmit={handleLogin} className="space-y-4">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600 transition"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-4 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600 transition"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-white transition"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded bg-gray-800 border-gray-700 text-yellow-600 focus:ring-yellow-600"
                          />
                          <span className="ml-2 text-sm text-gray-300">
                            Remember me
                          </span>
                        </label>
                        <button
                          type="button"
                          className="text-sm text-yellow-600 hover:text-yellow-500 transition"
                        >
                          Forgot password?
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-yellow-600 text-black font-bold rounded-lg hover:bg-yellow-500 transition cursor-pointer"
                      >
                        Sign In
                      </button>
                    </form>
                    <button
                      onClick={() => setIsShowingLogin(false)}
                      className="w-full mt-4 py-3 text-yellow-600 border font-bold rounded-lg cursor-pointer bg-transparent border-yellow-600 hover:text-yellow-500 transition"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Activity>
      </div>
      }
      

      <footer className="py-8 bg-gray-900 text-gray-400 border-t border-gray-800 text-center text-sm">
        <p>&copy; 2025 Unified Social Media Manager. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-indigo-500 cursor-pointer">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-indigo-500 cursor-pointer">
            Terms of Service
          </a>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
