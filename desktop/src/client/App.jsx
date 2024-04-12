import React from 'react';

// views
import MainView from './views/main-view';
import Breadcrumbs from './views/breadcrumbs';

const App = () => {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      <Breadcrumbs />

      {/* <WalletsView /> */}
      {/* <ConnectionPanel /> */}

      <MainView />
    </div>
  );
};

export default App;
