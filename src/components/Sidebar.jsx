import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { CheckSquare } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { Settings2 } from 'lucide-react';
import { Map } from 'lucide-react';
import { Building } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Activity } from 'lucide-react';
import { Clock } from 'lucide-react';

export default function Sidebar(props) {
  const children = props.children;
  const currentTab = props.currentTab; 
  
  const navigate = useNavigate();
  
  const [currentTime, setCurrentTime] = useState('');
  const [isLocked, setIsLocked] = useState(false); 

  const handleLockPanel = () => {
    localStorage.removeItem('session_active');
    setIsLocked(true); 
    navigate('/');
  };

  // clock stuff
  useEffect(() => {
    
    function updateClockTime() {
      const systemDate = new Date();
      
      const hours = systemDate.getHours();
      const minutes = systemDate.getMinutes();
      const seconds = systemDate.getSeconds();

      const timeStringString = hours + ":" + minutes + ":" + seconds; 
      
      setCurrentTime(timeStringString);
    }

    updateClockTime(); 
    
    const clockIntervalId = setInterval(updateClockTime, 1000);

    return () => {
      clearInterval(clockIntervalId);
    };
    
  }, []); 

  const link1 = { id: 'overview', label: 'MAIN', path: '/dashboard', icon: LayoutGrid };
  const link2 = { id: 'missions', label: 'MISSIONS', path: '/dashboard/missions', icon: CheckSquare };
  const link3 = { id: 'comms', label: 'CHATS', path: '/dashboard/comms', icon: MessageSquare };
  const link4 = { id: 'equipment', label: 'EQUIPMENTS', path: '/dashboard/equipment', icon: Settings2 };
  const link5 = { id: 'map', label: 'MAP', path: '/dashboard/map', icon: Map };
  const link6 = { id: 'wayne', label: 'COMPANY', path: '/dashboard/wayne', icon: Building };

  const menuLinksArray = [link1, link2, link3, link4, link5, link6];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      
      <header className="bg-gray-50 border-b border-gray-800 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 shadow-sm">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded border border-gray-900 bg-gray-50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">DASHBOARD</h1>
            <p className="text-[11px] text-gray-400 font-semibold">REVOLUTIONIZE!</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded px-3.5 py-1.5 text-xs text-gray-800 font-semibold shadow-inner">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>
              {currentTime ? currentTime : '00:00:00'}
            </span>
          </div>

          <button 
            onClick={handleLockPanel} 
            className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900 px-3.5 py-1.5 rounded font-bold uppercase transition-all duration-200 active:scale-95 cursor-pointer text-[10px]" 
            title="Lock Panel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LOCK PANEL</span>
          </button>

        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        <nav className="w-full md:w-60 bg-white border-r border-gray-200 md:border-b-0 border-b p-4 flex flex-col justify-between flex-shrink-0 z-15 shadow-sm">
          
          <div className="space-y-1.5">
            <span className="block text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-3 pl-2"> 
              Sidebar
            </span>

            {menuLinksArray.map((singleLink) => {
              
              const linkId = singleLink.id;
              const linkLabel = singleLink.label;
              const linkPath = singleLink.path;
              const TabIconComponent = singleLink.icon;
              
              const isMainDashboard = linkPath === '/dashboard';

              return (
                <NavLink 
                  key={linkId} 
                  to={linkPath} 
                  end={isMainDashboard} 
                  className={({ isActive }) => {
                    let classes = "w-full text-left py-2.5 px-3.5 rounded font-bold tracking-wide text-xs transition-all flex items-center gap-3 ";
                    
                    if (isActive) {
                      classes += "bg-gray-950 text-white shadow-md";
                    } else {
                      classes += "text-gray-500 hover:text-gray-900 hover:bg-gray-50";
                    }
                    
                    return classes;
                  }}
                >
                  <TabIconComponent className="w-4 h-4" />
                  <span>{linkLabel}</span>
                </NavLink>
              );

            })}

          </div>

          <div className="hidden md:block pt-6 mt-6 border-t border-gray-100 text-center">
            <span className="text-[9px] text-gray-400 tracking-wider uppercase font-semibold"> 
              Oracle Router Mode: Active 
            </span>
          </div>

        </nav>

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>

      </div>

    </div>
  );
}
