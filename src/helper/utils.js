const isLoggedIn = () =>{
    if (!(localStorage.getItem("loggedIn") === "true")) {
    toast.error("Please login first", { id: "login_error" });
    console.log(loggedIn);
    router.push("/home");
    return;
    }else{
        return true
    }
}

const appCountBasedNavigation = () =>{
    if (localStorage.getItem("socialMediaAppsTokensCount") && localStorage.getItem("socialMediaAppsTokensCount") == "0") {
      toast.error("Please connect at least 1 social media platform", {
        id: "apps_error",
      });
      router.push("/dashboard/accounts");
      return null;
    }else{
        return true
    }
}

export { isLoggedIn, appCountBasedNavigation };