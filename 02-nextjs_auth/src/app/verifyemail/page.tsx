/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
// const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  //take token from url as soon as the page loads
  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];//url acessing token-spilts into 2 part before = and after it take 1 index
    setToken(urlToken || "");

    //bbetter method-take out query after ? 
    // const {query}=router;//getting query from url
    // const urlTokenTwo=query.token;//getting token from url
  },[]);

  //work only when token is changed
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();         
    }
  },[token]);
  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

        {verified && (
            <div>
                <h2 className="text-2xl">Email Verified</h2>
                <Link href="/login" className="underline text-blue-500 ">
                    Login
                </Link>
            </div>
        )}
        {error && (
            <div>
                <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                
            </div>
        )}
    </div>
)

}
