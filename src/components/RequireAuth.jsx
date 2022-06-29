import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Loader from "../components/Reusable/Loader";
const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const axios = useApi();
  console.log(auth);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      const response = await axios.patch("/users").catch(() => {
        console.log("redirecting to login after catch");
        navigate("/login");
      });
      if (response?.status === 200) {
        console.log("here");
        if (response.data.user?.roles?.some((role) => allowedRoles?.includes(role))) return setAuth(response.data.user);
        navigate("/login");
      } else navigate("/login");
    };
    verifyUser();
  }, []);
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.login ? (
    <Navigate to="/reports" state={{ from: location }} replace />
  ) : (
    <Loader />
  );
};

export default RequireAuth;
