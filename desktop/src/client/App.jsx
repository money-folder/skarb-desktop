import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// screens
import HomeScreen from './screens/home-screen/HomeScreen';
import WalletsScreen from './screens/wallets-screen/WalletsScreen';
import WalletScreen from './screens/wallet-screen/WalletScreen';

// widgets
import NavigationSidebar from './widgets/navigation/NavigationSidebar';

const App = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex">
      <HashRouter>
        <NavigationSidebar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/wallets" element={<WalletsScreen />} />
            <Route path="/wallets/:id" element={<WalletScreen />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
