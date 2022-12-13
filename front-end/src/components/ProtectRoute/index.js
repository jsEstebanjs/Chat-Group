import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectRoute({ loader }) {
  const user = useSelector((state) => state.userSlice);
  const [view,setView] = useState(true)

  useEffect(() => {
    if(!loader){
        if(!user.name){
            setView(false)
        }
    }

  },[loader]);

  return (
    view 
    ? 
    <Outlet /> 
    :
    <Navigate to='/login'/>
    )
}

export default ProtectRoute;