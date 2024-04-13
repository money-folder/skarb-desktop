import React from 'react';
import { useWallet } from '../../client/queries/wallets-queries';
import { useWhistory } from '../../client/queries/whistory-queries';

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

  if (isWhistoryLoading) {
    return <div>Loading...</div>;
  }

  if (isWhistoryError || !whistoryList) {
    return <div>Error</div>;
  }

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
