import { Provider } from "react-redux";
import { useStore } from "../data/store";
import "../styles/globals.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import { DefaultWrap } from "../components/wrap/DefaultWrap";
import { Auth0Provider } from "@auth0/auth0-react";

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  const Layout = Component.layout || DefaultLayout;
  const Wrap = Component.wrap || DefaultWrap;

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Auth0Provider
          domain="dev-jx8fysvq.us.auth0.com"
          clientId="d0b0YU95Fq69C0QMovzgxjfv2oY5aXmT"
          redirectUri="http://localhost:3000/perfil"
          audience="https://api-prello/v1"
        >
          <Layout initialProps={{ ...pageProps }}>
            <Wrap Component={Component}></Wrap>
          </Layout>
        </Auth0Provider>
      </DndProvider>
    </Provider>
  );
};

export default MyApp;
