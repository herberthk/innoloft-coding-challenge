import Head from "next/head";
import React from "react";
import { FC } from "react";

interface Props {
  title?: string;
  keywords?: string;
  description?: string;
}

const Meta: FC<Props> = ({
  title = "Innoloft",
  keywords = "AI, SaaS, No code platform",
  description = "Innoloft is a software technology company that builds business platform infrastructure.",
}) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
