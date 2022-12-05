import Head from "next/head"
import React from "react"

type Props = {
  children: React.ReactNode
}

const SEO: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <Head>
      <title>Poached</title>
      <meta
        name="description"
        content="Too much to read, pick out just the ingredients and instructions!"
      />

      <meta
        property="og:image"
        content="https://og-image.vercel.app/Poached.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fcamo.githubusercontent.com%2Ff8a48b7332cae55ed4aa0d03b9e8db4a06c7863d3472ad4a80b2b52fcefedfdb%2F68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f706f67676965732f696d6167652f75706c6f61642f76313636363935383839392f6a326a697565776234667063667a6d336e6561302e706e67"
      />
      <meta property="og:title" content="Poached" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="https://poached.vercel.app/" />
      <meta property="twitter:url" content="https://poached.vercel.app/" />
      <meta name="twitter:title" content="Poached" />
      <meta
        name="twitter:description"
        content="Too much to read, pick out just the ingredients and instructions!"
      />
      <meta
        name="twitter:image"
        content="https://og-image.vercel.app/Poached.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg&images=https%3A%2F%2Fcamo.githubusercontent.com%2Ff8a48b7332cae55ed4aa0d03b9e8db4a06c7863d3472ad4a80b2b52fcefedfdb%2F68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f706f67676965732f696d6167652f75706c6f61642f76313636363935383839392f6a326a697565776234667063667a6d336e6561302e706e67"
      />
      {children}
    </Head>
  )
}

export default SEO
