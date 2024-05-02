import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// queries
import {
  useSoftDeleteWallet,
  useRestoreWallet,
  useWallets,
  useHardDeleteWallet,
} from '../../queries/wallets-queries';

// widgets
import AddWhistoryModal from '../../widgets/add-whistory/AddWhistoryModal';

// components
import { OverlayContext } from '../../components/overlay/OverlayProvider';

// icons
import OpenIcon from '../../assets/open.svg';
import PlusIcon from '../../assets/plus.svg';
import CrossIcon from '../../assets/cross.svg';
import RestoreIcon from '../../assets/restore.svg';
import TrashIcon from '../../assets/trash.svg';
import CreateWalletButton from '../../widgets/create-wallet/CreateWalletButton';

const WalletsScreen = () => {
  const {
    data: wallets,
    isError: isWalletsError,
    isLoading: isWalletsLoading,
  } = useWallets();

  const { mutateAsync: softDeleteWallet } = useSoftDeleteWallet();
  const { mutateAsync: hardDeleteWallet } = useHardDeleteWallet();
  const { mutateAsync: restoreWallet } = useRestoreWallet();

  const { addOverlay } = useContext(OverlayContext);

  const onAddClick = (walletId: string) => {
    addOverlay(({ removeSelf }) => (
      <AddWhistoryModal walletId={walletId} close={removeSelf} />
    ));
  };

  const onDeleteClick = async (id: string) => {
    await softDeleteWallet(id);
  };

  const onHardDeleteClick = async (id: string) => {
    await hardDeleteWallet(id);
  };

  const onRestoreClick = async (id: string) => {
    restoreWallet(id);
  };

  if (isWalletsLoading) {
    return <div>Loading...</div>;
  }

  if (isWalletsError || !wallets) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-center font-extrabold text-xl">Wallets</h2>

      <div className="mt-10 flex flex-col items-center">
        <div className="w-2/3">
          <CreateWalletButton text="Create Wallet" />
        </div>

        <table className="mt-5 w-2/3">
          <thead>
            <tr>
              <th className="p-1 text-sm border-2 border-black">Name</th>
              <th className="p-1 text-sm border-2 border-black">
                Latest Balance
              </th>
              <th className="p-1 text-sm border-2 border-black">Currency</th>
              <th className="p-1 text-sm border-2 border-black">
                Latest Report
              </th>
              <th className="p-1 text-sm border-2 border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet) => (
              <tr key={wallet.id}>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${wallet.deletedAt ? 'opacity-30' : ''}`}
                >
                  {wallet.name}
                </td>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${wallet.deletedAt ? 'opacity-30' : ''}`}
                >
                  {wallet.latestBalance || '-'}
                </td>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${wallet.deletedAt ? 'opacity-30' : ''}`}
                >
                  {wallet.currency}
                </td>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${wallet.deletedAt ? 'opacity-30' : ''}`}
                >
                  {wallet.latestBalanceTs || '-'}
                </td>
                <td className="p-1 space-x-2 text-sm text-center border-2 border-black">
                  <Link to={`/wallets/${wallet.id}`}>
                    <button className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100">
                      <img src={OpenIcon} alt="open" />
                    </button>
                  </Link>

                  <button
                    className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                    onClick={() => onAddClick(`${wallet.id}`)}
                  >
                    <img src={PlusIcon} alt="plus" />
                  </button>

                  {wallet.deletedAt ? (
                    <>
                      <button
                        className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => onRestoreClick(`${wallet.id}`)}
                      >
                        <img src={RestoreIcon} alt="restore" />
                      </button>
                      <button
                        className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => onHardDeleteClick(`${wallet.id}`)}
                      >
                        <img src={TrashIcon} alt="restore" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => onDeleteClick(`${wallet.id}`)}
                      >
                        <img src={CrossIcon} alt="cross" />
                      </button>
                    </>
                  )}
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
