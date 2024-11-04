'use client';

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/proxy/Users/get-by-email/stepanukdima523@gmail.com');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Data from API:', data); // Виведення результату в консолі
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Users Page</h1>
      <p>Check the console for API results</p>
    </div>
  );
}
