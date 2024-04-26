import React from 'react';

// queries
import { useWallet } from '../../queries/wallets-queries';
import { useRemoveWhistory, useWhistory } from '../../queries/whistory-queries';

// icons
import CrossIcon from '../../assets/cross.svg';

interface WalletViewProps {
  activeWalletId: string;
}

const WalletScreen = ({ activeWalletId }: WalletViewProps) => {
  const { data: wallet } = useWallet(activeWalletId);

  const {
    data: whistoryList,
    isLoading: isWhistoryLoading,
    isError: isWhistoryError,
  } = useWhistory(activeWalletId);

  const { mutateAsync } = useRemoveWhistory(activeWalletId);

  if (isWhistoryLoading) {
    return <div>Loading...</div>;
  }

  if (isWhistoryError || !whistoryList) {
    return <div>Error</div>;
  }

  const onDeleteClick = async (walletId: string) => {
    await mutateAsync(walletId);
  };

  console.log(whistoryList);

  return (
    <div className="h-full w-full grid grid-cols-2 overflow-hidden">
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
                <tr
                  key={whistory.id}
                  className={`${whistory.deletedAt ? 'opacity-30' : ''}`}
                >
                  <td className="p-1 text-sm text-center border-2 border-black">
                    {whistory.id}
                  </td>
                  <td className="p-1 text-sm text-center border-2 border-black">
                    {whistory.amount}
                  </td>
                  <td className="p-1 text-sm text-center border-2 border-black">
                    {whistory.date}
                  </td>
                  <td className="p-1 text-sm text-center border-2 border-black">
                    <button
                      className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                      onClick={() => onDeleteClick(`${whistory.id}`)}
                    >
                      <img src={CrossIcon} alt="cross icon" />
                    </button>
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
