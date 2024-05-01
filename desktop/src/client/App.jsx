import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// screens
import HomeScreen from './screens/home-screen/HomeScreen';
import CurrenciesScreen from './screens/currencies-screen/CurrenciesScreen';
import ConnectionsScreen from './screens/connections-screen/ConnectionsScreen';
import WalletsScreen from './screens/wallets-screen/WalletsScreen';
import WalletScreen from './screens/wallet-screen/WalletScreen';

// widgets
import NavigationSidebar from './widgets/navigation/NavigationSidebar';

const App = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex">
      <HashRouter>
        <NavigationSidebar />

        <div className="p-5 flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/connections" element={<ConnectionsScreen />} />
            <Route path="/currencies" element={<CurrenciesScreen />} />
            <Route path="/wallets" element={<WalletsScreen />} />
            <Route path="/wallets/:id" element={<WalletScreen />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default App;
