import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>You will be redirected to the home page in 5 seconds...</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
