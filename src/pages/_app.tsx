import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import Modal from "~/components/modals";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <Component {...pageProps} />
      <Modal />
    </div>
  );
};

export default MyApp;
