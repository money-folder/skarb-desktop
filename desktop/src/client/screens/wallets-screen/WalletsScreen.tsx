import React, { useContext } from 'react';

// stores
import { useActiveWalletStore } from '../../stores/active-wallet-store';

// queries
import { useWallets } from '../../queries/wallets-queries';
import { useCurrencies } from '../../queries/currencies-queries';

// widgets
import AddWhistoryModal from '../../widgets/add-whistory/AddWhistoryModal';
import CreateWalletModal from '../../widgets/create-wallet/CreateWalletModal';

// components
import { OverlayContext } from '../../components/overlay/OverlayProvider';

// icons
import OpenIcon from '../../assets/open.svg';
import PlusIcon from '../../assets/plus.svg';

const WalletsScreen = () => {
  const {
    data: wallets,
    isError: isWalletsError,
    isLoading: isWalletsLoading,
  } = useWallets();

  const { data: currencies } = useCurrencies();

  const { addOverlay } = useContext(OverlayContext);

  const setActiveWalletId = useActiveWalletStore(
    (store) => store.setActiveWalletId,
  );

  const onOpenClick = (walletId: string) => {
    setActiveWalletId(walletId);
  };

  const onAddClick = (walletId: string) => {
    addOverlay(({ removeSelf }) => (
      <AddWhistoryModal walletId={walletId} close={removeSelf} />
    ));
  };

  const onCreateWalletClick = () => {
    addOverlay(({ removeSelf }) => (
      <CreateWalletModal currencies={currencies!} close={removeSelf} />
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

      <div className="mt-10 flex flex-col items-center">
        <div className="w-2/3">
          <button
            className="cursor-pointer hover:underline"
            onClick={onCreateWalletClick}
          >
            Create Wallet
          </button>
        </div>

        <table className="mt-10 w-2/3">
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
                    className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                    onClick={() => onOpenClick(`${wallet.id}`)}
                  >
                    <img src={OpenIcon} alt="open" />
                  </button>

                  <button
                    className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                    onClick={() => onAddClick(`${wallet.id}`)}
                  >
                    <img src={PlusIcon} alt="plus" />
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
