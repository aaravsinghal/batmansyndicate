import React from 'react';
import Sidebar from '../components/Sidebar';
import GothamMap from '../components/GothamMap';

// some referneces from the batman trilogy technically all task should be completed true
const DEFAULT_MISSIONS = [
  { id: 'm1', title: 'Stop Joker from blowing up the hospital', priority: 'CRITICAL', district: 'Gotham General', completed: false },
  { id: 'm2', title: 'Catch Scarecrow before he releases fear toxin in the Narrows', priority: 'HIGH', district: 'The Narrows', completed: true },
  { id: 'm3', title: 'Find the truck carrying Harvey Dent before it explodes', priority: 'CRITICAL', district: 'Gotham Harbor', completed: false },
  { id: 'm4', title: 'Defeat Bane and save the city from nuclear destruction', priority: 'CRITICAL', district: 'City Hall', completed: false }
];

export default function MapPage() {
  const saveNewMissionFromMap = (crimeReport) => {
    const savedMissions = localStorage.getItem('syndicate_missions');
    let existingMissions = DEFAULT_MISSIONS;

    // honestly this localStorage thing was giving me a headache
    if (savedMissions) {
      try {
        existingMissions = JSON.parse(savedMissions);
      } catch (err) {
        console.error("welp localStorage broke again", err);
      }
    }

    const freshMission = {
      id: 'm-' + Date.now(),
      title: crimeReport.title,
      priority: crimeReport.priority,
      district: crimeReport.district,
      completed: false
    };

    const updatedMissionList = [freshMission, ...existingMissions];

    localStorage.setItem('syndicate_missions', JSON.stringify(updatedMissionList));
  };

  return (
    <Sidebar currentTab="map">
      <GothamMap onAddMission={saveNewMissionFromMap} />
    </Sidebar>
  );
}