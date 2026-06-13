import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className='flex justify-center'>404 - Page Not Found</h1>
      <p className='flex justify-center text-xl '>The page you are looking for does not exist.</p>
      <button className="mx-auto bg-black text-white px-4 py-4 flex justify-center rounded" onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
}