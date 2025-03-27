"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default  function QikPayLanding() {
    const session = useSession()
    const user = session?.data?.user
    
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 bg-gray-800 shadow-lg">
          <h1 className="text-2xl font-bold text-blue-400">QikPay</h1>
          <button className="px-4 py-2 bg-blue-500 rounded-lg" onClick={()=>{
             {user ? redirect("/dashboard") : redirect("/api/auth/signin")}
          }}> {user ? "Go to Dashboard" : "Get Started"}</button>
        </nav>
        
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-4">
          <h1 className="text-4xl font-bold">Fast & Secure Payments</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Experience seamless transactions with QikPay. Fast, reliable, and hassle-free payments at your fingertips.
          </p>
          <button onClick={()=>{
             {user ? redirect("/dashboard") : redirect("/api/auth/signin")}
          }} className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg">
            {user ? "Go to Dashboard" : "Get Started"}
          </button>
        </section>
        
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 px-8 py-16">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Instant Transfers</h2>
            <p className="text-gray-400 mt-2">Send and receive money instantly with no hidden fees.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Secure & Reliable</h2>
            <p className="text-gray-400 mt-2">Bank-grade security ensures your transactions are always safe.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Global Support</h2>
            <p className="text-gray-400 mt-2">Transact across borders with multi-currency support.</p>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="text-center py-12 bg-blue-600">
          <h2 className="text-2xl font-bold">Join QikPay Today!</h2>
          <p className="text-lg text-gray-100 mt-2">{user ? "You are on board" : "Sign up now and start making transactions in seconds."}</p>
          
        </section>
      </div>
    );
  }
  