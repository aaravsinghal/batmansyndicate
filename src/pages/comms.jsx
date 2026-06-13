import React from 'react';
import Sidebar from '../components/Sidebar';
import MyChats from '../components/MyChats';

export default function CommsPage() {
  return (
    <Sidebar currentTab="comms">
      <MyChats />
    </Sidebar>
  );
}
