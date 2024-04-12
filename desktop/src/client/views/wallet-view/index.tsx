import React from 'react';
import { useWallet } from '../../queries/wallets-queries';
import { useWhistory } from '../../queries/whistory-queries';

interface WalletViewProps {
  activeWalletId: string;
}

export const WalletView = ({ activeWalletId }: WalletViewProps) => {
  const { data: wallet } = useWallet(activeWalletId);

  const {
    data: whistoryList,
    isLoading: isWhistoryLoading,
    isError: isWhistoryError,
  } = useWhistory(activeWalletId);

  if (isWhistoryLoading) {
    return <div>Loading...</div>;
  }

  if (isWhistoryError || !whistoryList) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-center font-extrabold text-xl">{wallet?.name}</h2>

      <div className="mt-10 flex h-full">
        <div className="w-1/2 h-72 overflow-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-1 text-sm border-2 border-black">ID</th>
                <th className="p-1 text-sm border-2 border-black">Amount</th>
                <th className="p-1 text-sm border-2 border-black">Date</th>
                {/* <th className="p-1 text-sm border-2 border-black">Controls</th> */}
              </tr>
            </thead>
            <tbody>
              {whistoryList.map((whistory) => (
                <tr key={whistory.id}>
                  <td className="p-1 text-sm text-center border-2 border-black">
                    {whistory.id}
                  </td>
                  <td className="p-1 text-sm text-center border-2 border-black">
                    {whistory.amount}
                  </td>
                  <td className="p-1 text-sm text-center border-2 border-black">
                    {whistory.date}
                  </td>
                  {/* <td className="p-1 text-sm text-center border-2 border-black">
                  <button>Delete</button>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletView;
