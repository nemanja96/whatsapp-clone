import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";
import Image from 'next/image';
import whatsappIcon from '../public/whatsapp.png';

function Loading() {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh", background: "#25D366"}}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Image src={whatsappIcon} width="200" height="200" />
          <br />
          <ScaleLoader color="white" size={100} />
        </div>
    </div>
  )
}

export default Loading