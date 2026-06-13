import React, { useState } from 'react';
import { Shirt, Crosshair, Car, Activity, Battery, Thermometer, Wrench, AlertCircle, Zap, Shield } from 'lucide-react';

const armors = [
  { id: 'suit', label: 'Batsuit', offText: 'Hanging in cave', onText: 'Wearing it', onMsg: 'Locked In', offMsg: 'Just Bruce again' },
  { id: 'cowl', label: 'Cowl', offText: 'On shelf', onText: 'On head', onMsg: 'Locked In', offMsg: 'Hair is a mess' },
  { id: 'cape', label: 'Cape', offText: 'Not attached', onText: 'Attached', onMsg: 'Cape on', offMsg: 'Cape off' },
  { id: 'boots', label: 'Boots', offText: 'Untied', onText: 'Laced up', onMsg: 'Boots on', offMsg: 'Boots off' },
  { id: 'gloves', label: 'Gloves', offText: 'Not on', onText: 'On', onMsg: 'Gloves on', offMsg: 'Gloves off' },
  { id: 'belt', label: 'Utility Belt', offText: 'No belt', onText: 'Strapped', onMsg: 'Belt on', offMsg: 'Belt off' },
];

const weapons = [
  { id: 'batarangs', label: 'Batarangs', offText: 'Put away', onText: 'Armed', onMsg: 'Batarangs ready', offMsg: 'Batarangs stored' },
  { id: 'grapple', label: 'Grapple Gun', offText: 'No wire', onText: 'Loaded', onMsg: 'Grapple ready', offMsg: 'Grapple empty' },
  { id: 'smoke', label: 'Smoke Bombs', offText: 'Out of stock', onText: 'x6 packed', onMsg: 'Smoke bombs ready', offMsg: 'No smoke bombs' },
  { id: 'explosives', label: 'Bat-Charges', offText: 'Defused', onText: 'Primed', onMsg: 'Charges primed', offMsg: 'Charges defused' },
  { id: 'flashbang', label: 'Flash Grenades', offText: 'Inactive', onText: 'Primed', onMsg: 'Flash grenades ready', offMsg: 'Flash grenades stored' },
  { id: 'rebreather', label: 'Rebreather', offText: 'Not on', onText: 'On', onMsg: 'Rebreather on', offMsg: 'Rebreather off' },
];

const batVehicle = [
  { id: 'batmobile', label: 'Batmobile', offText: 'Parked', onText: 'Engine on', onMsg: 'Batmobile started', offMsg: 'Batmobile parked' },
  { id: 'batcycle', label: 'Batcycle', offText: 'In garage', onText: 'Ready', onMsg: 'Batcycle ready', offMsg: 'Batcycle parked' },
  { id: 'batwing', label: 'Batwing', offText: 'Hangared', onText: 'Prepped', onMsg: 'Batwing ready', offMsg: 'Batwing stored' },
  { id: 'tracker', label: 'Vehicle Tracker', offText: 'Offline', onText: 'Tracking', onMsg: 'Tracker on', offMsg: 'Tracker off' },
];

function GearButton({ item, isOn, onToggle }) {
  return (
    <button
      onClick={() => onToggle(item.id, item.onMsg, item.offMsg, isOn)}
      className={`p-3 rounded border-2 w-full text-left transition-all ${
        isOn 
          ? 'bg-gray-900 text-white border-gray-900 scale-105 shadow-md' 
          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:scale-105'
      }`}
    >
      <p className="font-bold text-xs">{item.label}</p>
      <p className={`text-xs mt-1 ${isOn ? 'text-gray-300' : 'text-gray-500'}`}>
        {isOn ? item.onText : item.offText}
      </p>
    </button>
  );
}

function SectionHeader({ icon: Icon, title, activeCount, total }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-500" />
        <span className="text-xs font-bold text-gray-700">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-gray-200 rounded overflow-hidden">
          <div className="bg-gray-900 h-full" style={{ width: `${(activeCount / total) * 100}%` }}></div>
        </div>
        <span className="text-xs text-gray-400">{activeCount}/{total}</span>
      </div>
    </div>
  );
}

export default function Cave() {

  const [armorState, setArmorState] = useState({});
  const [weaponState, setWeaponState] = useState({});
  const [vehicleState, setVehicleState] = useState({});
  const [toast, setToast] = useState(null);
  const [toastTimer, setToastTimer] = useState(null);
  const [suitIntegrity, setSuitIntegrity] = useState(100);
  const [powerLevel, setPowerLevel] = useState(85);
  const [nightMode, setNightMode] = useState(false);

  function showToast(msg) {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    setToast(msg);
    const newTimer = setTimeout(function() {
      setToast(null);
    }, 3000);
    setToastTimer(newTimer);
  }

  function handleToggle(stateObj, setStateFunc, id, onMsg, offMsg, isCurrentlyOn) {
    setStateFunc({ ...stateObj, [id]: !isCurrentlyOn });
    showToast(isCurrentlyOn ? offMsg : onMsg);
    
    if (!isCurrentlyOn && id === 'suit') {
      setSuitIntegrity(prev => Math.max(prev - 5, 0));
    }
    if (!isCurrentlyOn && (id === 'batmobile' || id === 'batwing')) {
      setPowerLevel(prev => Math.max(prev - 10, 0));
    }
  }

  function countActive(stateObj) {
    let count = 0;
    const keys = Object.keys(stateObj);
    for (let i = 0; i < keys.length; i++) {
      if (stateObj[keys[i]] === true) {
        count++;
      }
    }
    return count;
  }

  const totalActive = countActive(armorState) + countActive(weaponState) + countActive(vehicleState);
  const totalItems = armors.length + weapons.length + batVehicle.length;
  const readiness = Math.round((totalActive / totalItems) * 100);

  function handleDeployAll() {
    const allArmor = {};
    armors.forEach(function(item) { allArmor[item.id] = true; });
    const allWeapons = {};
    weapons.forEach(function(item) { allWeapons[item.id] = true; });
    const allVehicles = {};
    batVehicle.forEach(function(item) { allVehicles[item.id] = true; });
    setArmorState(allArmor);
    setWeaponState(allWeapons);
    setVehicleState(allVehicles);
    setSuitIntegrity(prev => Math.max(prev - 15, 0));
    setPowerLevel(prev => Math.max(prev - 20, 0));
    showToast('Full deployment mode. Gotham should be scared.');
  }

  function handleStandDown() {
    setArmorState({});
    setWeaponState({});
    setVehicleState({});
    showToast('Standing down. Bruce Wayne mode activated.');
  }

  function repairSuit() {
    setSuitIntegrity(100);
    showToast('Suit repaired. Alfred says you owe him one.');
  }

  function rechargePower() {
    setPowerLevel(100);
    showToast('Power cells recharged. Fox upgraded the system.');
  }

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-bold">READINESS</span>
            <span className="text-xs font-bold text-gray-900">{readiness}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
            <div className="bg-gray-900 h-full" style={{ width: `${readiness}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{totalActive} of {totalItems} equipped</p>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-400 font-bold">SUIT INTEGRITY</span>
            </div>
            <span className={`text-xs font-bold ${suitIntegrity < 30 ? 'text-red-600' : 'text-gray-900'}`}>{suitIntegrity}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
            <div className={`h-full ${suitIntegrity < 30 ? 'bg-red-600' : 'bg-gray-900'}`} style={{ width: `${suitIntegrity}%` }}></div>
          </div>
          <button 
            onClick={repairSuit}
            className="text-xs text-gray-500 hover:text-gray-900 mt-2 flex items-center gap-1"
          >
            <Wrench className="w-3 h-3" /> Repair
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Battery className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-400 font-bold">POWER LEVEL</span>
            </div>
            <span className={`text-xs font-bold ${powerLevel < 30 ? 'text-red-600' : 'text-gray-900'}`}>{powerLevel}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
            <div className={`h-full ${powerLevel < 30 ? 'bg-red-600' : 'bg-gray-900'}`} style={{ width: `${powerLevel}%` }}></div>
          </div>
          <button 
            onClick={rechargePower}
            className="text-xs text-gray-500 hover:text-gray-900 mt-2 flex items-center gap-1"
          >
            <Zap className="w-3 h-3" /> Recharge
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-bold">NIGHT MODE</span>
            <span className={`text-xs font-bold ${nightMode ? 'text-blue-600' : 'text-gray-400'}`}>
              {nightMode ? 'ACTIVE' : 'OFF'}
            </span>
          </div>
          <button
            onClick={() => {
              setNightMode(!nightMode);
              showToast(nightMode ? 'Night mode off. Lights on.' : 'Night mode active. Stealth enhanced.');
            }}
            className={`w-full py-2 rounded text-xs font-bold transition-all ${
              nightMode 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {nightMode ? '☾ ENHANCED STEALTH' : '☀ TOGGLE NIGHT MODE'}
          </button>
          <p className="text-xs text-gray-400 mt-2 text-center">Cowl vision mode</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded p-5">

        {toast && (
          <div className="fixed bottom-6 right-6 w-80 bg-gray-900 text-white border border-gray-700 rounded p-4 z-50 flex items-center justify-between gap-3 shadow-lg">
            <span className="text-xs font-bold">{toast}</span>
            <button onClick={() => setToast(null)} className="text-gray-400 hover:text-white">✕</button>
          </div>
        )}

        <div className="border-b border-gray-100 pb-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-gray-900 font-bold text-xs">BATCAVE ARMORY</h2>
            <p className="text-xs text-gray-400 mt-1">Press any button to gear up</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDeployAll}
              disabled={readiness === 100}
              className={`text-xs font-bold px-6 py-2 rounded ${
                readiness === 100 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              LOCK IN ALL
            </button>
            <button
              onClick={handleStandDown}
              disabled={readiness === 0}
              className={`text-xs font-bold px-4 py-2 rounded ${
                readiness === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-600'
              }`}
            >
              Stand Down
            </button>
          </div>
        </div>

        <div className="space-y-6">

          <div>
            <SectionHeader
              icon={Shirt}
              title="Armor & Suit"
              activeCount={countActive(armorState)}
              total={armors.length}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {armors.map(function(item) {
                return (
                  <GearButton
                    key={item.id}
                    item={item}
                    isOn={armorState[item.id] === true}
                    onToggle={function(id, onMsg, offMsg, isOn) {
                      handleToggle(armorState, setArmorState, id, onMsg, offMsg, isOn);
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <SectionHeader
              icon={Crosshair}
              title="Weapons & Gear"
              activeCount={countActive(weaponState)}
              total={weapons.length}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {weapons.map(function(item) {
                return (
                  <GearButton
                    key={item.id}
                    item={item}
                    isOn={weaponState[item.id] === true}
                    onToggle={function(id, onMsg, offMsg, isOn) {
                      handleToggle(weaponState, setWeaponState, id, onMsg, offMsg, isOn);
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <SectionHeader
              icon={Car}
              title="Vehicles & Transport"
              activeCount={countActive(vehicleState)}
              total={batVehicle.length}
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {batVehicle.map(function(item) {
                return (
                  <GearButton
                    key={item.id}
                    item={item}
                    isOn={vehicleState[item.id] === true}
                    onToggle={function(id, onMsg, offMsg, isOn) {
                      handleToggle(vehicleState, setVehicleState, id, onMsg, offMsg, isOn);
                    }}
                  />
                );
              })}
            </div>
          </div>

        </div>

        {suitIntegrity < 50 && (
          <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-xs text-red-700 font-bold">WARNING: Suit damage detected</span>
            </div>
            <button onClick={repairSuit} className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
              Repair Now
            </button>
          </div>
        )}

        {powerLevel < 30 && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-xs text-yellow-700 font-bold">LOW POWER: Systems may fail</span>
            </div>
            <button onClick={rechargePower} className="text-xs bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700">
              Recharge
            </button>
          </div>
        )}

      </div>
    </div>
  );
}