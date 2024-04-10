import React from 'react';

// views
import ConnectionPanel from './ConnectionPanel';
import WalletsView from './views/wallets-view';
import MainView from './views/main-view';

const App = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex">
      {/* <WalletsView /> */}
      {/* <ConnectionPanel /> */}

      <MainView />
    </div>
  );
};

export default App;
