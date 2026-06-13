import React from 'react';
import Sidebar from '../components/Sidebar';
import WayneEnterprises from '../components/WayneEnterprises';

export default function WaynePage() {
  return (
    <Sidebar currentTab="wayne">
      <WayneEnterprises />
    </Sidebar>
  );
}
