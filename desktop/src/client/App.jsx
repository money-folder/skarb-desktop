import React from 'react';

// stores
import { useActiveWalletStore } from './stores/active-wallet-store';

// views
import MainView from './views/main-view';
import Breadcrumbs from './views/breadcrumbs';
import WalletView from './views/wallet-view';

const App = () => {
  const activeWalletId = useActiveWalletStore((store) => store.activeWalletId);

  const renderCurrentView = () => {
    if (activeWalletId) {
      return <WalletView activeWalletId={activeWalletId} />;
    }

    return <MainView />;
  };

  return (
    <div className="p-5 w-full h-screen overflow-hidden flex flex-col">
      <Breadcrumbs />

      <div className="flex-grow">{renderCurrentView()}</div>
    </div>
  );
};

export default App;
