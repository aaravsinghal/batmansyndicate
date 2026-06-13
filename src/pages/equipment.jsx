import React from 'react';
import Sidebar from '../components/Sidebar';
import Cave from '../components/cave';


export default function EquipmentPage() {
  return (
    <Sidebar currentTab="equipment">
      <Cave />
    </Sidebar>
  );
}
