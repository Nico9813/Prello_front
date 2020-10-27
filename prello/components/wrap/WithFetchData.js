import { useUserData } from "../../hooks/useUserData";

export const WithFetchData = ({ Component, InitialProps }) => {
  useUserData();

  return <Component {...InitialProps}/>;
};
