import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// screens
import HomeScreen from './screens/home-screen/HomeScreen';
import ConnectionsScreen from './screens/connections-screen/ConnectionsScreen';
import WalletsScreen from './screens/wallets-screen/WalletsScreen';
import WalletScreen from './screens/wallet-screen/WalletScreen';

// widgets
import NavigationSidebar from './widgets/navigation/NavigationSidebar';
import StatusBar from './widgets/status-bar/StatusBar';

const App = () => {
  return (
    <HashRouter>
      <div className="w-full h-screen overflow-hidden grid grid-cols-[auto,_1fr,_1fr] grid-rows-[1fr,_1fr,_auto]">
        <div className="col-span-1 row-span-3">
          <NavigationSidebar />
        </div>

        <div className="p-5 col-span-2 row-span-2">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/connections" element={<ConnectionsScreen />} />
            <Route path="/wallets" element={<WalletsScreen />} />
            <Route path="/wallets/:id" element={<WalletScreen />} />
          </Routes>
        </div>

        <div className="col-span-2 row-span-1">
          <StatusBar />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
