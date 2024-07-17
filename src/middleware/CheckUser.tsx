import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CheckUserProps {
  children: ReactElement;
}

const CheckUser = ({ children }: CheckUserProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("User_ID");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return localStorage.getItem("User_ID") ? children : null;
};

export default CheckUser;
