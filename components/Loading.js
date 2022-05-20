import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

function Loading() {
  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh"}}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png" alt="" height={200} style={{ marginBottom: 10 }} />
            <ScaleLoader color="#3cbc28" size={100} />
        </div>
    </div>
  )
}

export default Loading