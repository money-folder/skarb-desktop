import React from 'react';
import { useLocation } from 'react-router-dom';

import { useActiveWalletStore } from '../../stores/active-wallet-store';

// queries
import { useWallet } from '../../queries/wallets-queries';
import {
  useHardDeleteWhistory,
  useRemoveWhistory,
  useRestoreWhistory,
  useWhistory,
} from '../../queries/whistory-queries';

// icons
import CrossIcon from '../../assets/cross.svg';
import RestoreIcon from '../../assets/restore.svg';
import TrashIcon from '../../assets/trash.svg';

const WalletScreen = () => {
  const activeWalletId = location.hash.split('/').pop() as string;

  const { data: wallet } = useWallet(activeWalletId);

  const {
    data: whistoryList,
    isLoading: isWhistoryLoading,
    isError: isWhistoryError,
  } = useWhistory(activeWalletId);

  const { mutateAsync: softDelete } = useRemoveWhistory(activeWalletId);
  const { mutateAsync: restore } = useRestoreWhistory(activeWalletId);
  const { mutateAsync: hardDelete } = useHardDeleteWhistory(activeWalletId);

  if (isWhistoryLoading) {
    return <div>Loading...</div>;
  }

  if (isWhistoryError || !whistoryList) {
    return <div>Error</div>;
  }

  const onDeleteClick = async (walletId: string) => {
    await softDelete(walletId);
  };

  const onRestoreClick = async (walletId: string) => {
    await restore(walletId);
  };

  const onHardDeleteClick = async (walletId: string) => {
    await hardDelete(walletId);
  };

  return (
    <div className="h-full w-full grid grid-cols-2 grid-rows-[auto,_1fr] overflow-hidden">
      <h2 className="col-span-2 text-center font-extrabold text-xl">
        {wallet?.name}
      </h2>

      <div className="mt-10 col-span-2 overflow-hidden">
        <div className="h-full w-1/2 overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-1 text-sm border-2 border-black">ID</th>
                <th className="p-1 text-sm border-2 border-black">Amount</th>
                <th className="p-1 text-sm border-2 border-black">Date</th>
                <th className="p-1 text-sm border-2 border-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {whistoryList.map((whistory) => (
                <tr key={whistory.id}>
                  <td
                    className={`p-1 text-sm text-center border-2 border-black ${whistory.deletedAt ? 'opacity-30' : ''}`}
                  >
                    {whistory.id}
                  </td>
                  <td
                    className={`p-1 text-sm text-center border-2 border-black ${whistory.deletedAt ? 'opacity-30' : ''}`}
                  >
                    {whistory.amount}
                  </td>
                  <td
                    className={`p-1 text-sm text-center border-2 border-black ${whistory.deletedAt ? 'opacity-30' : ''}`}
                  >
                    {whistory.date}
                  </td>
                  <td
                    className={`p-1 space-x-2 text-sm text-center border-2 border-black`}
                  >
                    {whistory.deletedAt ? (
                      <>
                        <button
                          className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                          onClick={() => onRestoreClick(`${whistory.id}`)}
                        >
                          <img src={RestoreIcon} alt="restore" />
                        </button>

                        <button
                          className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                          onClick={() => onHardDeleteClick(`${whistory.id}`)}
                        >
                          <img src={TrashIcon} alt="restore" />
                        </button>
                      </>
                    ) : (
                      <button
                        className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => onDeleteClick(`${whistory.id}`)}
                      >
                        <img src={CrossIcon} alt="cross" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletScreen;
