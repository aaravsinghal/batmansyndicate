import React, { useState } from 'react';
import { Shield, Lock, Laptop, Key, Terminal, Eye, Copyright } from 'lucide-react';

export default function FakeCover(props) {
  const letIn_fn = props.onUnlock;
  const [usrVal, set_usrVal] = useState('');
  const [passVal, set_passVal] = useState('');
  const [err_txt, set_err_txt] = useState(''); 
  const [waitSpinner, set_waitSpinner] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    set_waitSpinner(true);
    set_err_txt('');

    const trimmedUser = usrVal.trim();
    const enteredPassword = passVal;

    if (trimmedUser === '') {
      set_err_txt('Please enter both username and password bro.');
      set_waitSpinner(false);
      return;
    }
    if (enteredPassword === '') {
      set_err_txt('Please enter both username and password bro.');
      set_waitSpinner(false);
      return;
    }

    const rightUser = import.meta.env.VITE_U;
    const rightPass = import.meta.env.VITE_P;
    // user and pass
    if (trimmedUser === rightUser) {
      if (enteredPassword === rightPass) {
        letIn_fn(); 
      } else {
        set_err_txt('What are you even doing here are u blind or smth? Clearly stated the website is in progress and you should not be here. GTFO.');
      }
    } else {
      set_err_txt('What are you even doing here are u blind or smth? Clearly stated the website is in progress and you should not be here. GTFO.');
    }
    set_waitSpinner(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col ">
      
      <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-gray-700" />
          <span className="font-bold text-m text-gray-900">
            WAYNE ENTERPRISES
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gray-900 transition-colors">About</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gray-900 transition-colors">Investments</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gray-900 transition-colors">R&D Assets</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-gray-900 transition-colors">Careers</a>
        </div>

        <div>
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-2 rounded font-bold">
            Scarecrow hehe
          </span>
        </div>
      </nav>

      <main className="max-w-4xl w-full mx-auto px-6 py-13 flex-1 flex flex-col md:flex-row items-center justify-center ">
        
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-block bg-gray-100 border border-gray-200 px-2 py-2 text-xs font-bold text-gray-600 ">
            Website In Progress
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 ">
            Wayne Enterprises Website In Progress
          </h1>
          <p className="text-sm text-gray-600 max-w-md">
           The drunk billionare who burnt down his own house on his birthday. Btw 1st of the trilogy for hint and see the top right corner of the website for more hints. Iykyk
          </p>
          <div className="border-l-2 border-gray-200 pl-4 py-1 text-xs text-gray-400 italic">
            "Im whatever gotham needs me to be" — Great Words
          </div>
        </div>

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 px-4 flex flex-col justify-center items-center py-2 mx-auto mb-4">
            <Lock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-bold text-gray-500">
              Log In
            </span>
          </div>

          {err_txt && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-500 font-semibold">
              {err_txt}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 ">
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Enter username..."
                value={usrVal}
                onChange={(e) => set_usrVal(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-950"
                disabled={waitSpinner}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 ">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Enter password..." 
                value={passVal}
                onChange={(e) => set_passVal(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-950"
                disabled={waitSpinner}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-950 hover:bg-gray-900 text-white py-2.5 rounded text-xs cursor-pointer"
              disabled={waitSpinner}
            >
              {waitSpinner ? 'Verifying...' : 'Access'}
            </button>
          </form>
        </div>

      </main>

      <footer className="w-full border-t border-gray-200 py-6 text-center text-xs text-gray-400 font-medium tracking-wide">
        <Copyright className="w-3 h-3 inline-block mb-0.5" />
         2089 WAYNE ENTERPRISES INDUSTRIAL SYSTEMS INC. ALL RIGHTS RESERVED.
      </footer>

    </div>
  );
}
