import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

export default function Forbidden() {
  const navigate = useNavigate(); // Instantiate the navigate function

  return (
    <main className="grid min-h-screen px-6 py-24 place-items-center bg-rgb-235-232-232 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-4xl font-bold text-rgb-26-24-24">404</p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-rgb-26-24-24 sm:text-7xl">
          Access to this page is restriced
        </h1>
        <p className="mt-6 text-lg font-medium text-rgb-26-24-24 sm:text-xl">
          Please contact admin to get access of this page 
        </p>
        <div className="flex items-center justify-center mt-10 gap-x-6">
          <button
            className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:ring focus-visible:ring-slate-700 focus-visible:ring-offset-2"
            onClick={() => navigate('/')} // Use navigate to go to the homepage
          >
            Go Back
          </button>
          <button
            className="text-sm font-semibold text-rgb-26-24-24"
            onClick={() => window.location = 'mailto:support@example.com'} // Use window.location for mailto links
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </main>
  );
}
