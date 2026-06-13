import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MyMissions from '../components/MyMissions';

const DEFAULTS = [
  { id: '1', title: 'Stop Scarecrow gas leaks at Wayne Chemical', priority: 'CRITICAL', district: 'Bleake Island', completed: false },
  { id: 'm2', title: 'Track Penguin weapon trucks', priority: 'HIGH', district: 'Founders Island', completed: false },
  { id: 'm3', title: 'Listen to Riddler radio codes', priority: 'LOW', district: 'Miagani Island', completed: true },
  { id: 'm4', title: 'Check Two-Face bank robbery', priority: 'HIGH', district: 'Diamond District', completed: false}
];


export default function MissionsPage() {
  
  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem('syndicate_missions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Error", err);
      }
    }
    return DEFAULTS;
  });

  const resetToDefaults = () => {
    localStorage.removeItem('syndicate_missions');
    setMissions(DEFAULTS);
  };

  useEffect(() => {
    localStorage.setItem('syndicate_missions', JSON.stringify(missions));
  }, [missions]);

  return (
    <Sidebar currentTab="missions">
      <div className="mb-4 flex justify-end">
        <button 
          onClick={resetToDefaults}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-xs font-bold transition-all"
        >
          Reset to Default Missions
        </button>
      </div>
      
      <MyMissions 
        missions={missions} 
        setMissions={setMissions} 
      />
    </Sidebar>
  );
}1