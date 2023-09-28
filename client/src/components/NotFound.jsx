import React from "react";
import notFound from "../assests/page-not-found.jpg";

export default function NotFound() {
  return (
    <>
      <img style={{ width: "100vw" }} src={notFound} alt="page-not-found-img" />
    </>
  );
}
