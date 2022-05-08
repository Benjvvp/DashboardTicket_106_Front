import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "../contexts/userContext/UserContextProvider";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default MyApp;
