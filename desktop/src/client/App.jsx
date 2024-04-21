import React from 'react';

// stores
import { useActiveWalletStore } from './stores/active-wallet-store';

// views
import WalletsScreen from './screens/wallets-screen/WalletsScreen';
import WalletScreen from './screens/wallet-screen';

// widgets
import Breadcrumbs from './widgets/breadcrumbs';

const App = () => {
  const activeWalletId = useActiveWalletStore((store) => store.activeWalletId);

  const renderCurrentView = () => {
    if (activeWalletId) {
      return <WalletScreen activeWalletId={activeWalletId} />;
    }

    return <WalletsScreen />;
  };

  return (
    <div className="p-5 w-full h-screen overflow-hidden grid grid-cols-[repeat(2,_1fr)] grid-rows-[auto,_1fr]">
      <div className="col-span-2">
        <Breadcrumbs />
      </div>

      <div className="col-span-2 overflow-hidden">{renderCurrentView()}</div>
    </div>
  );
};

export default App;
