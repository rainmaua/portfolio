import Head from "next/head";
type Props = {
  title?: string;
};
export default function Header({ title = "" }) {
  return (
    <>
      <Head>
        <title>{title ? title + "- WuBooks" : "WuBooks"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}