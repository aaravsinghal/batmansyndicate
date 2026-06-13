import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, AlertOctagon, ShieldAlert, Filter, MapPin } from 'lucide-react';

export default function MyMissions({ missions, setMissions }) {
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('HIGH');
  const [newDistrict, setNewDistrict] = useState('Crime Alley');

  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddMission = (e) => {
    e.preventDefault();
    if (newTitle.trim() === '') {
      return; 
    }

    let missionData = {
      id: 'm-' + Date.now(),
      title: newTitle.trim(),
      priority: newPriority,
      district: newDistrict,
      completed: false
    };

    setMissions([missionData, ...missions]);
    setNewTitle(''); 
  };

  const handleToggleComplete = (id) => {
    let copy = [];
    for (let i = 0; i < missions.length; i++) {
      if (missions[i].id === id) {
        copy.push({ ...missions[i], completed: !missions[i].completed });
      } else {
        copy.push(missions[i]);
      }
    }
    setMissions(copy);
  };

  const handleDeleteMission = (id) => {
    let filtered = [];
    for (let i = 0; i < missions.length; i++) {
      if (missions[i].id !== id) {
        filtered.push(missions[i]);
      }
    }
    setMissions(filtered);
  };

  const filteredMissions = [];
  for (let i = 0; i < missions.length; i++) {
    const mission = missions[i];
    const matchesSearch = mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mission.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'ALL' || mission.priority === priorityFilter;
    if (matchesSearch) {
      if (matchesPriority) {
        filteredMissions.push(mission);
      }
    }
  }

  const activeCount = missions.filter(m => !m.completed).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm text-gray-700 select-none">
      
      <div className="lg:col-span-1 bg-white border border-gray-200 shadow-card rounded-lg p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
            <ShieldAlert className="w-4 h-4 text-gray-700" />
            <h2 className="text-gray-900 font-bold  text-xs">
              LOG NEW MISSION
            </h2>
          </div>

          <form onSubmit={handleAddMission} className="space-y-4">
            <div>
              <label className="block text-[10px] text-gray-400 mb-1.5 font-bold">
                Threat Description
              </label>
              <textarea
                placeholder="Enter active crime intel details..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                rows="3"
                className="w-full bg-white border border-gray-300 rounded p-2.5 text-gray-800 focus:outline-none focus:border-gray-950 resize-none text-xs"
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-400   mb-1.5 font-bold">
                Threat Level Priority
              </label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded p-2 text-gray-800 focus:outline-none focus:border-gray-950  font-bold text-xs"
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="LOW">LOW</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-gray-400   mb-1.5 font-bold">
                Target District Grid
              </label>
              <select
                value={newDistrict}
                onChange={(e) => setNewDistrict(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded p-2 text-gray-800 focus:outline-none focus:border-gray-950 font-bold text-xs"
              >
                <option value="Crime Alley">Crime Alley</option>
                <option value="Arkham Island">Arkham Island</option>
                <option value="Diamond District">Diamond District</option>
                <option value="Bleake Island">Bleake Island</option>
                <option value="Founders Island">Founders Island</option>
                <option value="Miagani Island">Miagani Island</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-950 hover:bg-gray-900 text-white py-2.5 rounded font-bold   flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer text-xs"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              SAVE MISSION
            </button>
          </form>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>TOTAL REGISTERED MISSIONS</span>
            <span className="font-bold text-gray-700">{missions.length}</span>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>ACTIVE THREATS</span>
            <span className="font-bold text-red-600">{activeCount}</span>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>RESOLVED</span>
            <span className="font-bold text-green-600">{missions.length - activeCount}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white border border-gray-200 shadow-card rounded-lg p-5 flex flex-col min-h-[400px]">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-4">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-gray-700" />
            <h2 className="text-gray-900 font-bold  text-xs ">
              ACTIVE MISSION
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-300 rounded px-2.5 py-1.5 w-full sm:w-44 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-950 text-xs"
            />
            
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-white border border-gray-300 rounded px-2 py-1.5 text-[10px] text-gray-700 font-bold  focus:outline-none focus:border-gray-950 "
              >
                <option value="ALL">ALL PRIORITY</option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[350px] space-y-3 pr-1">
          {filteredMissions.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-8 border border-dashed border-gray-200 rounded">
              <p className=" text-[10px] tracking-widest mb-1"><TABLE></TABLE> Empty</p>
              <p className="text-[9px]">No matching threat  identified in this sector.</p>
            </div>
          ) : (
            filteredMissions.map((mission) => {
              const isCrit = mission.priority === 'CRITICAL';
              const isHigh = mission.priority === 'HIGH';
              
              const badgeBg = isCrit 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : isHigh 
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200';

              return (
                <div
                  key={mission.id}
                  className={`flex items-start justify-between gap-4 p-4 rounded border transition-all duration-200 ${
                    mission.completed 
                      ? 'bg-gray-50/50 border-gray-100 opacity-60' 
                      : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      onClick={() => handleToggleComplete(mission.id)}
                      className="mt-0.5 text-gray-400 hover:text-gray-900 active:scale-90 transition-colors cursor-pointer"
                      title={mission.completed ? "Mark Uncompleted" : "Mark Completed"}
                    >
                      {mission.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <p className={`text-xs leading-relaxed text-gray-800 ${
                        mission.completed ? 'line-through text-gray-400' : ''
                      }`}>
                        {mission.title}
                      </p>

                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded  ${badgeBg}`}>
                          {mission.priority}
                        </span>
                        
                        <span className="flex items-center gap-0.5 text-[9px] text-gray-400 font-bold ">
                          <MapPin className="w-3 h-3 text-gray-300" />
                          {mission.district.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteMission(mission.id)}
                    className="text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 border border-transparent hover:border-red-100 active:scale-95 transition-all self-center cursor-pointer"
                    title="Purge Intel Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
