import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "../contexts/userContext/UserContextProvider";
import { ThemeProvider } from "next-themes";
import SocketContextProvider from "../contexts/socketContext/SocketContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <SocketContextProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SocketContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;
