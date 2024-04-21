import React, { useContext } from 'react';

// stores
import { useActiveWalletStore } from '../../stores/active-wallet-store';

// queries
import { useWallets } from '../../queries/wallets-queries';
import { OverlayContext } from '../../components/overlay/OverlayProvider';
import AddWhistoryModal from '../../widgets/add-whistory/AddWhistoryModal';

const WalletsScreen = () => {
  const {
    data: wallets,
    isError: isWalletsError,
    isLoading: isWalletsLoading,
  } = useWallets();

  const { addOverlay } = useContext(OverlayContext);

  const setActiveWalletId = useActiveWalletStore(
    (store) => store.setActiveWalletId,
  );

  const onOpenClick = (walletId: string) => {
    setActiveWalletId(walletId);
  };

  const onAddClick = (walletId: string) => {
    // show a modal with a 'add whistory entry'-form
    addOverlay(({ removeSelf }) => (
      <AddWhistoryModal walletId={walletId} close={removeSelf} />
    ));
  };

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
                <td className="flex gap-2 text-left">
                  <button
                    className="cursor-pointer hover:underline"
                    onClick={() => onOpenClick(`${wallet.id}`)}
                  >
                    Open
                  </button>

                  <button
                    className="cursor-pointer hover:underline"
                    onClick={() => onAddClick(`${wallet.id}`)}
                  >
                    Add
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
