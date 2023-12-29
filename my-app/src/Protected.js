import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie'

const Protected = ({ children }) => {
  const cookies = new Cookies
  const user = cookies.get("username")
  const pass = cookies.get("password")
  if (user === undefined || pass===undefined){
    return <Navigate to="/" replace />;
  }
  return children
};
export default Protected;