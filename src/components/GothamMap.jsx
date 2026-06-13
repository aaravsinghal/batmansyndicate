import React, { useState } from 'react';
import { Target, ShieldAlert, Radio, Plus, CheckCircle, Navigation } from 'lucide-react';
import gothamRadarImg from '../assets/gotham_city_radar.png';

const CRIME_HOTSPOTS = [
  { id: 'c-1', title: 'Bank Robbery at diamond bank , Joker Card Spotted', risk: 'HIGH', district: 'Diamond District', top: '55%', left: '55%', description: 'Bank Robber , Some robbers found dead , main robberer maybe in a school bus.' },
  { id: 'c-2', title: 'Scarecrow toxin dispersal riot', risk: 'CRITICAL', district: 'Arkham Island', top: '15%', left: '38%', description: 'Riot alert at Arkham Asylum courtyard logs detect gas emission.' },
  { id: 'c-3', title: 'Gotham General Bomb Threat', risk: 'HIGH', district: 'Gotham City', top: '30%', left: '75%', description: 'Joker tip received about potential explosive device in downtown Gotham.' },
  { id: 'c-4', title: 'Street robbery interception', risk: 'LOW', district: 'Crime Alley', top: '70%', left: '62%', description: 'Muggers cornering citizens near Park Row. Heat scan shows 3 hostile targets with knives.' }
];

export default function GothamMap({ onAddMission }) {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [addedMissionsList, setAddedMissionsList] = useState({});

  const handleAddToLedger = (crime) => {
    onAddMission({
      title: `${crime.title} (Map Intel)`,
      priority: crime.risk,
      district: crime.district
    });

    setAddedMissionsList(prev => ({
      ...prev,
      [crime.id]: true
    }));
  };

  let selectedCrime = null;
  for (let i = 0; i < CRIME_HOTSPOTS.length; i++) {
    if (CRIME_HOTSPOTS[i].id === selectedHotspot) {
      selectedCrime = CRIME_HOTSPOTS[i];
      break;
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm text-gray-700">
      
      <div className="lg:col-span-2 bg-white border border-gray-200 shadow-card rounded-lg p-5 flex flex-col items-center">
        
        <div className="w-full flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-gray-700" />
            <h2 className="text-gray-900 font-bold  text-xs">
              LIVE MAP
            </h2>
          </div>
          <span className="text-sm text-gray-400  font-bold">
            SCAN FEED: ACTIVE
          </span>
        </div>

        <div className="w-full relative bg-gray-150 border border-gray-200 rounded overflow-hidden aspect-[500/350] shadow-inner">
          
          <img 
            src={gothamRadarImg} 
            className="w-full h-full object-cover opacity-80" 
            alt="Gotham City Tactical Map" 
          />
          {CRIME_HOTSPOTS.map((crime) => {
            const isSelected = selectedHotspot === crime.id;
            const isCritical = crime.risk === 'CRITICAL';
            
            return (
              <div
                key={crime.id}
                style={{ top: crime.top, left: crime.left }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                onClick={() => setSelectedHotspot(crime.id)}
              >
                <div 
                  className={`w-3.5 h-3.5 rounded-full transition-all border border-white shadow-md ${
                    isCritical 
                      ? 'bg-red-600 hover:bg-red-500' 
                      : 'bg-amber-500 hover:bg-amber-400'
                  } ${
                    isSelected ? 'scale-125 ring-2 ring-gray-950' : 'group-hover:scale-110'
                  }`}
                ></div>
                
                <span className="absolute left-5 top-1/2 -translate-y-1/2 bg-gray-900 border border-gray-800 text-[9px] font-bold text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity  ce-nowrap ">
                  {crime.district.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-1 bg-white border border-gray-200 shadow-card rounded-lg p-5 flex flex-col justify-between h-[395px]">
        <div>
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
            <Target className="w-4 h-4 text-gray-700" />
            <h2 className="text-gray-900 font-bold  text-xs ">
              Description & Intel
            </h2>
          </div>

          {selectedHotspot === null ? (
            <div className="h-44 flex flex-col items-center justify-center text-center text-gray-400 border border-dashed border-gray-200 rounded">
              <p className="text-[10px] mb-1">Target Standby</p>
              <p className="text-[9px] max-w-[150px] leading-relaxed mx-auto text-gray-500">
                Click any flashing marker coordinates on the map.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-gray-400   font-bold">REPORTED HEIST</span>
                <h3 className="text-gray-900 font-bold text-xs mt-0.5 ">
                  {selectedCrime.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
                  <span className="block text-[9px] text-gray-400 font-bold  mb-0.5">DISTRICT</span>
                  <span className="font-bold text-gray-700">{selectedCrime.district.toUpperCase()}</span>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
                  <span className="block text-[9px] text-gray-400  font-bold  mb-0.5">THREAT STATUS</span>
                  <span className={`font-bold ${
                    selectedCrime.risk === 'CRITICAL' ? 'text-red-600 font-bold' : 'text-amber-600'
                  }`}>{selectedCrime.risk}</span>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-3 rounded text-[11px] leading-relaxed text-gray-600">
                {selectedCrime.description}
              </div>
            </div>
          )}
        </div>

        {selectedHotspot !== null && (
          <div className="space-y-2 pt-4 border-t border-gray-100">
            {addedMissionsList[selectedCrime.id] ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-2.5 rounded font-bold text-center flex items-center justify-center gap-2 text-xs">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>ADDED TO CHECKLIST</span>
              </div>
            ) : (
              <button
                onClick={() => handleAddToLedger(selectedCrime)}
                className="w-full bg-gray-950 hover:bg-gray-900 text-white py-2.5 rounded font-bold   flex items-center justify-center gap-2 transition-all active:scale-[0.9] cursor-pointer text-xs"
              >
                <Plus className="w-4 h-4 stroke-[3px]" />
                Add to Mission Ledger
              </button>
            )}

            <div className="bg-gray-50 border border-gray-200 text-gray-400 p-2 rounded text-center text-xs  ">
              Coords: {selectedCrime.top} / {selectedCrime.left}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
