import react from "react";
import {Navigate,Outlet} from "react-router-dom"

const PrivateComponent = ({state})=>{
 


return state? <Outlet/> : <Navigate to="/"/>
}

export default PrivateComponent;