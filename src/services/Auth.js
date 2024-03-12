import { getUserData } from "./Storage";
import { removeUserData } from "./Storage";

export const isAuthenticated =() => {
   return getUserData()!=null?true:false
}

export const logOut = ()=>{
   removeUserData()
}