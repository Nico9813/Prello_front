import { useEffect } from "react";
import { useUserData } from "../../hooks/useUserData";

export const WithFetchData = ({ Component, InitialProps }) => {
  useEffect(() => {
    console.log("fetching data...");
    useUserData();
  }, []);

  return <Component {...InitialProps} />;
};
