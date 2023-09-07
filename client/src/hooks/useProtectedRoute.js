import { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";

const useProtectedRoute = (route) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(route)
      .then(() => {
        console.log("Authenticated and authorized");
        setIsAuthorized(true);
      })
      .catch((error) => {
        console.error("Not authenticated or authorized", error);
      });
  }, [route]);

  return [isAuthorized, setIsAuthorized];
};

export default useProtectedRoute;
