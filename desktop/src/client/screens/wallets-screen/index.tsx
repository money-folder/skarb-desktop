import React from 'react';

// stores
import { useActiveWalletStore } from '../../stores/active-wallet-store';

// queries
import { useWallets } from '../../queries/wallets-queries';

const WalletsScreen = () => {
  const {
    data: wallets,
    isError: isWalletsError,
    isLoading: isWalletsLoading,
  } = useWallets();

  const setActiveWalletId = useActiveWalletStore(
    (store) => store.setActiveWalletId,
  );

  if (isWalletsLoading) {
    return <div>Loading...</div>;
  }

  if (isWalletsError || !wallets) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-center font-extrabold text-xl">
        This is your Wallets
      </h2>
      <div className="mt-10 flex justify-center">
        <table className="w-2/3">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Latest Balance</th>
              <th className="text-left">Currency</th>
              <th className="text-left">Latest Report</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet) => (
              <tr key={wallet.id}>
                <td className="text-left">{wallet.name}</td>
                <td className="text-left">{wallet.latestBalance || '-'}</td>
                <td className="text-left">{wallet.currency}</td>
                <td className="text-left">{wallet.latestBalanceTs || '-'}</td>
                <td className="text-left">
                  <button
                    className="cursor-pointer hover:underline"
                    onClick={() => setActiveWalletId(`${wallet.id}`)}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletsScreen;
