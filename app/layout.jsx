import Nav from "@Components/Nav";
import Provider from "@Components/Provider";

import "@Styles/globals.css";
export const metaData ={
title: "Sty styles",
description:"Desconizations for styles in a document"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
    <body>
      <Provider>
<div className="main">
    <div className="gradient"/>
    </div> 
    <main className="app">
        <Nav/>
{children}
    </main>
    </Provider>
    </body>
    </html>
  )
}

export default RootLayout