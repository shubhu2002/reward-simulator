import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import Modal from "~/components/modals";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontWeight: 600,
          },
        }}
      />
      <Component {...pageProps} />
      <Modal />
    </div>
  );
};

export default MyApp;
