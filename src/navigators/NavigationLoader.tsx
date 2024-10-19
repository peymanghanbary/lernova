import { useEffect, useState } from "react";
import SplashScreen from "../pages/splash/SplashScreen";
import RootNavigator from "./RootNavigator";

export default function NavigationLoader() {
    const [inited,setInited]=useState(false)
    
    useEffect(()=>{
        setTimeout(()=>{
            setInited(true)
        },1500)
    },[])

    if(inited){
        return (
            <RootNavigator/>
        )
    }
  
  return (
    <SplashScreen/>
  );
}