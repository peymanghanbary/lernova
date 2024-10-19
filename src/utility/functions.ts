import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";

export const number_format = (number:any=null, decimals:any=undefined, decPoint:any=undefined, thousandsSep:any=undefined) => {
    let num = (number + "").replace(/[^0-9+\-Ee.]/g, "");
    const n = !isFinite(+num) ? 0 : +num;
    const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
    const sep = typeof thousandsSep === "undefined" ? "," : thousandsSep;
    const dec = typeof decPoint === "undefined" ? "." : decPoint;
    let s:any = "";
  
    const toFixedFix = function (n:any, prec:any) {
      if (("" + n).indexOf("e") === -1) {
        let toBeRound:any=n + "e+" + prec
        return +(Math.round(toBeRound) + "e-" + prec);
      } else {
        const arr = ("" + n).split("e");
        let sig = "";
        if (+arr[1] + prec > 0) {
          sig = "+";
        }
        let tbr:any=+arr[0] + "e" + sig + (+arr[1] + prec)
        return (+(
          Math.round(tbr) +
          "e-" +
          prec
        )).toFixed(prec);
      }
    };
  
    // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec).toString() : "" + Math.round(n)).split(".");
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
      s[1] = s[1] || "";
      s[1] += new Array(prec - s[1].length + 1).join("0");
    }
  
    return s.join(dec);
  };

  export const calcImageHeight = (imageW:number, imageH:number, width:number) => {
    return imageH * (width / imageW);
  };

  export const is_null=(variable)=>{
    if(variable==null || variable=='' || variable==undefined || variable=='null' || variable=='undefined'){
        return true
    }else{
        return false;
    }
  }

  export const StoreData = async (key:any,value:any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {}
  }
  
  export const GetData = async (key) => {
    try {
      let data=await AsyncStorage.getItem(key)
      if(is_null(data)){
        return null
      }
      return JSON.parse(data)
    } catch (e) {}
  }
  
  export const toast=(message,duration=null)=>{
    
    let d=duration
    switch(d){
        case 'null':
            d=ToastAndroid.LONG
            break
        case true:
        case 'LONG':
        case 'long':
            d=ToastAndroid.LONG
            break
        case false:
        case 'SHORT':
        case 'short':
            d=ToastAndroid.SHORT
            break
        default:
          d=ToastAndroid.SHORT
          break;
      }

    ToastAndroid.show(message,d)
}

export const isIpValid=(ip)=>{
  const ipv4Pattern = 
        /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Pattern = 
        /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
}