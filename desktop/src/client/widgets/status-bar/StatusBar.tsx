import React from 'react';

import { useCurrentConnection } from '../../queries/db-source-queries';

const StatusBar = () => {
  const { data: currentConnection } = useCurrentConnection();

  return (
    <div className="px-2 h-8 flex items-center border-t-2 border-black">
      <p className="text-xs">
        {currentConnection ? (
          <>
            <span>Connected to: </span>
            <span>{currentConnection}</span>
          </>
        ) : (
          <>
            <span>No active connection!</span>
          </>
        )}
      </p>
    </div>
  );
};

export default StatusBar;
