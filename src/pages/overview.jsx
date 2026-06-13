import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MusicPlayer from '../components/MusicPlayer';
import { Terminal, BellRing, X, Battery, Sun, Cloud, Snowflake, CloudLightning, AlertTriangle } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';
import { CloudRainWind } from 'lucide-react';

const myReminders = [
  { id: 1, text: 'Question my life choices.', done: false },
  { id: 2, text: 'Reflect on the meaning of my existence.', done: false },
  { id: 3, text: 'Stare on wall thinking how to skip taxes', done: false },
  { id: 4, text: 'Am i the main character ? ', done: false },
  { id: 5, text: "think on how to make fox work illegaly for me ", done: true },
];

const alerts = [
  "[ALERT] You have been revolutionized",
  "[ALERT] Gang war in progress at Gotham Docks.",
  "[ALERT] Truck hijacking in sector 7.",
  "[ALERT] Signal tower offline in downtown.",
  "[ALERT] Murder at docks",
  "[ALERT] Huge traffic jam due to cow sitting in middle of highway.",
  "[ALERT] Scorpio convoy blocking road cuz Papa vidhayak hain",
  "[ALERT] Man in steel lost his memory again bruh."
];

const cityWeather = [
  { temp: 28, text: "CLEAR SKY", icon: <Sun className="w-5 h-5 text-yellow-500" /> },
];

export default function OverviewPage() {
  const [batteryLevel, setBatteryLevel] = useState(82);
  const [batteryCritical, setBatteryCritical] = useState(false);

  useEffect(() => {
    const batteryTimer = setInterval(() => {
      setBatteryLevel(function(prev) {
        if (prev <= 5) {
          return prev;
        }
        const newLevel = prev - 1;
        if (newLevel < 20) {
          setBatteryCritical(true);
        }
        return newLevel;
      });
    }, 5678);

    return function() {
      clearInterval(batteryTimer);
    };
  }, []);

  const [weather] = useState(cityWeather[0]);

  const [reminders, setReminders] = useState(myReminders);

  function toggleReminder(id) {
    const updated = reminders.map(function(item) {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setReminders(updated);
  }

  const [messages, setMessages] = useState([
    { sender: "Alfred", time: "23:44", text: "Your car keys are by the door.", type: "normal" },
    { sender: "Mr. Fox", time: "23:12", text: "Wanted to give you a surprise come see me ", type: "normal" },
    { sender: "anonymous", time: "22:45", text: "do you bleed?", type: "alert" },
  ]);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    const alertInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * alerts.length);
      const randomMsg = alerts[randomIndex];

      const now = new Date();
      const newTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newMessage = {
        sender: "GORDON & GCPD",
        time: newTime,
        text: randomMsg,
        type: "alert"
      };

      setMessages(function(prev) {
        const newList = [newMessage, ...prev];
        if (newList.length > 4) {
          newList.pop();
        }
        return newList;
      });

      setToast(randomMsg);

      setTimeout(function() {
        setToast(null);
      }, 3678);
    }, 12345);

    return function() {
      clearInterval(alertInterval);
    };
  }, []);

  return (
    <Sidebar currentTab="overview">
      {toast && (
        <div className="fixed bottom-6 right-6 w-80 bg-red-100 border border-gray-700 rounded-lg shadow-2xl p-4 z-50 flex items-center justify-between gap-3">
          <p className="font-bold text-xs text-gray-950">GCPD ALERT NET</p>
          <span className="text-xs font-bold text-gray-950">{toast}</span>
          <button onClick={() => setToast(null)} className="text-gray-500 hover:text-gray-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-gray-900 font-bold text-lg">
              YOU ARE NOT BRAVE, MEN ARE BRAVE.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`bg-white rounded-lg border p-5 text-center ${batteryCritical ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
              <p className="text-xs text-gray-400 font-bold mb-1">The Bat Battery Status</p>
              <p className={`text-xl font-bold flex items-center justify-center gap-1 ${batteryCritical ? 'text-red-600' : 'text-gray-800'}`}>
                <Battery className={`w-5 h-5 ${batteryCritical ? 'text-red-600' : 'text-green-600'}`} />
                {batteryLevel}%
              </p>
              {batteryCritical && (
                <div className="text-xs text-red-600 font-bold mt-2 flex items-center justify-center gap-1 bg-red-100 px-2 py-1 rounded inline-flex">
                  <AlertTriangle className="w-3 h-3" /> LOW POWER
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-xs text-gray-400 font-bold mb-1">City Weather Update</p>
              <p className="text-xl font-bold text-gray-700 flex items-center justify-center gap-2">
                {weather.icon}
                {weather.temp}° / {weather.text}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5 text-center">
              <p className="text-xs text-gray-400 font-bold mb-1">Gotham Threat Level</p>
              <p className="text-xl font-bold text-red-600 flex items-center justify-center gap-1">
                <AlertTriangle className="w-4 h-4" />
                10+
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
              <Terminal className="w-4 h-4 text-gray-700" />
              <span className="text-gray-900 font-bold text-xs">ALERTS & MESSAGES</span>
            </div>

            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 p-3 rounded border ${msg.type === 'alert' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${msg.type === 'alert' ? 'text-red-700 bg-red-100' : 'text-blue-700 bg-blue-50'}`}>
                    {msg.sender}
                  </span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                  <span className={`text-xs ${msg.type === 'alert' ? 'text-red-800 font-bold' : 'text-gray-600'}`}>{msg.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <MusicPlayer />

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FaCheckCircle className="w-3 h-3 text-emerald-500" />
              <span className="text-xs text-gray-400 font-bold">MY DAILY REMINDERS</span>
            </div>
            
            <ul className="space-y-2">
              {reminders.map((item) => (
                <li 
                  key={item.id} 
                  onClick={() => toggleReminder(item.id)}
                  className={`flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 ${item.done ? 'opacity-50' : ''}`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center ${item.done ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                    {item.done && <BellRing className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-xs text-gray-600 ${item.done ? 'line-through text-gray-400' : ''}`}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}