import Head from "next/head";
import Image from "next/image";
import CalculationModal from "~/components/calculation-modal";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lovelace Club Reward Simulator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-yellow-100 px-[4%] text-black">
        <div className="relative flex h-[606px] w-full max-w-[786px] flex-col items-center justify-start gap-4 rounded-lg border-2 border-black bg-emerald-200 p-5 tracking-wide shadow-[3px_3px_0_#101010]">
          {/* heading */}
          <div className="flex w-full flex-col items-center justify-start">
            <Image
              src={"/llc.png"}
              alt="logo"
              height={200}
              width={200}
              className="absolute -top-2"
            />
            <h1 className="mt-[58px] text-center text-3xl font-extrabold text-[#fbca1f] md:text-4xl">
              Lovelace Club Reward Calculator
            </h1>
          </div>

          <CalculationModal />
        </div>
      </main>
    </>
  );
}
