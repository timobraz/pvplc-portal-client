import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Home = () => {
  const { auth } = useAuth();
  return (
    <>
      <h1>Home Page</h1>
      {Object.keys(auth).length === 0 ? <Navigate to="/login" replace /> : <Navigate to="/reports" replace />}
    </>
  );
};

export default Home;
