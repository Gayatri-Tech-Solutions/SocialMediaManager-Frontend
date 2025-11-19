"use client"
import axios from "axios"
import Landingpage from "../components/landingpage";
const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
// const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
const Home = () =>{



     const connect_twitter = async () =>{
        console.log("Calling backend");
        try{
            const response = await axios.get(`${backend_url}/connect-twitter`);
            console.log(response.data)
            if(response.data.redirect_url == undefined){
                console.log("something went wrong")
            }else{
                alert("You will be redirect to twiiter authentication page copy the pin and enter on the page")
                window.location.href=response.data.redirect_url
            }
            console.log("printing something")
            // window.open(response.data.redirect_url)
        }catch(error){
            console.log("error in homepage",error)
        }
    }

     const connect_facebook = async () =>{
        console.log("Calling facebook backend");
        try{
            const response = await axios.get(`${backend_url}/connect-facebook`);
            console.log(response.data)
            if(response.data.redirect_url == undefined){
                console.log("something went wrong")
            }else{
                alert("You will be redirect to facebook authentication page copy the pin and enter on the page")
                window.location.href=response.data.redirect_url
            }
            console.log("printing something")
            // window.open(response.data.redirect_url)
        }catch(error){
            console.log("error in homepage",error)
        }
    }


    return(<>
    
        <Landingpage></Landingpage>
    </>)
}

export default Home