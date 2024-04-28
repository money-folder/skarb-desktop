import React from 'react';

// queries
import { useCurrencies } from '../../queries/currencies-queries';

const CurrenciesScreen = () => {
  const {
    data: currencies,
    isError: isCurrenciesError,
    isLoading: isCurrenciesLoading,
  } = useCurrencies();

  if (isCurrenciesLoading) {
    return <div>Loading...</div>;
  }

  if (isCurrenciesError || !currencies) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-center font-extrabold text-xl">Currencies</h2>

      <div className="mt-10 w-full flex justify-center">
        <table className="w-2/3">
          <thead>
            <tr>
              <th className="p-1 text-sm border-2 border-black">Id</th>
              <th className="p-1 text-sm border-2 border-black">Name</th>
              <th className="p-1 text-sm border-2 border-black">Created At</th>
              <th className="p-1 text-sm border-2 border-black">Deleted At</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency.id}>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${false ? 'opacity-30' : ''}`}
                >
                  {currency.id}
                </td>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${false ? 'opacity-30' : ''}`}
                >
                  {currency.name}
                </td>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${false ? 'opacity-30' : ''}`}
                >
                  {currency.createdAt}
                </td>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${false ? 'opacity-30' : ''}`}
                >
                  {currency.deletedAt || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrenciesScreen;
