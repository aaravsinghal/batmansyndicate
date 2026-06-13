import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, Plus, Trash2, CheckCircle, Circle, ShieldAlert } from 'lucide-react';


// added a2 myself but others are ai , not really good with the array part
const DEFAULT_AGENDA = [
  { id: 'a1', title: 'Question Board of Directors financial review', time: '13:00', done: true },
  { id: 'a2', title: 'Pick up some girls', time: '14:30', done: false },
  { id: 'a3', title: 'Review applied sciences proposals with Lucius Fox', time: '16:00', done: false },
  { id: 'a4', title: 'Wayne Foundation charity gala dinner (mandatory appearance)', time: '19:30', done: false }
];

export default function WayneEnterprises() {
  const [rdBudget, setRdBudget] = useState(250);
  const [charityBudget, setCharityBudget] = useState(150);
  const [legalBudget, setLegalBudget] = useState(320);
  const [secretBudget, setSecretBudget] = useState(100);
  const [diversionNotice, setDiversionNotice] = useState(false);

  const [stockPrice] = useState(214.67);
  const [stockChange] = useState(+3.21);
  const [boardAwareness] = useState(0);

  const [agenda, setAgenda] = useState(function() {
    const saved = localStorage.getItem('ceo_agenda');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return DEFAULT_AGENDA;
      }
    }
    return DEFAULT_AGENDA;
  });

  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  useEffect(function() {
    localStorage.setItem('ceo_agenda', JSON.stringify(agenda));
  }, [agenda]);

  const divertFunds = () => {
    if (legalBudget >= 25) {
      setLegalBudget((prev) => prev - 25);
      setSecretBudget((prev) => prev + 25);
      setDiversionNotice(true);
      setTimeout(() => {
        setDiversionNotice(false);
      }, 3500);
    }
  };

  const handleAddMeeting = (e) => {
    e.preventDefault();
    if (!meetingTitle.trim() || !meetingTime) return;

    const newMeeting = {
      id: 'a-' + Date.now(),
      title: meetingTitle.trim(),
      time: meetingTime,
      done: false
    };

    setAgenda([...agenda, newMeeting]);
    setMeetingTitle('');
    setMeetingTime('');
  };

  const handleToggleMeeting = (id) => {
    setAgenda(
      agenda.map(function(meet) {
        if (meet.id === id) {
          return { ...meet, done: !meet.done };
        }
        return meet;
      })
    );
  };

  const handleDeleteMeeting = (id) => {
    setAgenda(agenda.filter(function(meet) { return meet.id !== id; }));
  };

  const totalBudget = rdBudget + charityBudget + legalBudget;

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded p-4 text-center">
          <p className="text-xs text-gray-400 font-bold mb-1">WE Stock Price</p>
          <p className="text-xl font-bold text-gray-900">${stockPrice}</p>
          <p className="text-xs text-green-600 font-bold mt-1">+${stockChange} today</p>
        </div>
        <div className="bg-white border border-gray-200 rounded p-4 text-center">
          <p className="text-xs text-gray-400 font-bold mb-1">Total Capital</p>
          <p className="text-xl font-bold text-gray-900">${totalBudget}M</p>
          <p className="text-xs text-gray-400 font-bold mt-1">allocated this quarter</p>
        </div>
        <div className="bg-white border border-gray-200 rounded p-4 text-center">
          <p className="text-xs text-gray-400 font-bold mb-1">Board Awareness</p>
          <p className="text-xl font-bold text-gray-900">{boardAwareness}%</p>
          <p className="text-xs text-gray-400 font-bold mt-1">of actual operations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white border border-gray-200 rounded p-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-700" />
              <h2 className="text-gray-900 font-bold text-xs uppercase">WAYNE CORP BUDGET</h2>
            </div>
            <span className="text-xs text-gray-400 font-bold">TOTAL: ${totalBudget}M</span>
          </div>

          {diversionNotice && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 flex items-center gap-2 text-xs font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>$25M rerouted to Applied Sciences. Fox knows. He sighed.</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-gray-400 font-bold mb-1">
                <span>Applied Sciences & R&D</span>
                <span>${rdBudget}M</span>
              </div>
              <div className="w-full bg-gray-100 border border-gray-200 h-2 rounded overflow-hidden">
                <div className="bg-gray-800 h-full" style={{ width: `${(rdBudget / totalBudget) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-400 font-bold mb-1">
                <span>Wayne Foundation — Gotham Rebuilding</span>
                <span>${charityBudget}M</span>
              </div>
              <div className="w-full bg-gray-100 border border-gray-200 h-2 rounded overflow-hidden">
                <div className="bg-blue-600 h-full" style={{ width: `${(charityBudget / totalBudget) * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-400 font-bold mb-1">
                <span>Corporate Legal & Lobbying</span>
                <span>${legalBudget}M</span>
              </div>
              <div className="w-full bg-gray-100 border border-gray-200 h-2 rounded overflow-hidden">
                <div className="bg-red-500 h-full" style={{ width: `${(legalBudget / totalBudget) * 100}%` }}></div>
              </div>
            </div>

            <div className="border-t border-gray-100 my-4"></div>

            <div className="bg-gray-50 border border-dashed border-gray-300 rounded p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-800 text-xs uppercase">APPLIED SCIENCES RESERVE</p>
                <p className="text-xs text-gray-500 mt-1">Off-books: ${secretBudget}M</p>
                <p className="text-xs text-gray-400 italic">"I never ask." — Lucius Fox</p>
              </div>
              <button
                onClick={divertFunds}
                disabled={legalBudget < 25}
                className={`px-3 py-2 rounded text-xs font-bold border cursor-pointer ${
                  legalBudget < 25
                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 hover:border-gray-900 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Divert $25M
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-400 border-t border-gray-100 mt-6 pt-3 text-center">
            "You're not the CEO Gotham deserves, but the one it needs right now."
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded p-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
            <Calendar className="w-4 h-4 text-gray-700" />
            <h2 className="text-gray-900 font-bold text-xs uppercase">BRUCE WAYNE — TODAY</h2>
          </div>

          <form onSubmit={handleAddMeeting} className="grid grid-cols-3 gap-2 mb-4">
            <input
              type="text"
              placeholder="Duties..."
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              className="col-span-2 bg-white border border-gray-300 rounded px-2 py-1.5 text-xs"
            />
            <input
              type="text"
              placeholder="12:00"
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2 py-1.5 text-center text-xs"
            />
            <button
              type="submit"
              className="col-span-3 bg-gray-950 hover:bg-gray-900 text-white py-1.5 rounded font-bold text-xs cursor-pointer"
            >
              Add CEO Duty
            </button>
          </form>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {agenda.length === 0 ? (
              <p className="text-center text-gray-400 italic py-6 text-xs">All done. Alfred is proud.</p>
            ) : (
              agenda.map(function(meet) {
                return (
                  <div
                    key={meet.id}
                    className={`flex items-center justify-between p-2 border rounded ${
                      meet.done ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleMeeting(meet.id)}
                        className="text-gray-400 hover:text-gray-900 cursor-pointer"
                      >
                        {meet.done ? (
                          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Circle className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <div>
                        <p className={`font-bold text-gray-800 text-xs ${meet.done ? 'line-through text-gray-400' : ''}`}>
                          {meet.title}
                        </p>
                        <p className="text-xs text-gray-400 font-bold">{meet.time}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteMeeting(meet.id)}
                      className="text-gray-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}