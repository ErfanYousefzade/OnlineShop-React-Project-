import { useNavigate } from "react-router"

export default function Protected({children}){
    const isToken=localStorage.getItem("token")
    const navigate= useNavigate()

     
        if (token){
            {children}
        }
        else{
            navigate("/Admin")
        }

        
  
}