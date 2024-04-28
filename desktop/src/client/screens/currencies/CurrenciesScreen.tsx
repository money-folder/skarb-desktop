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

      <table className="mt-10">
        <thead>
          <th className="p-1 text-sm border-2 border-black">Id</th>
          <th className="p-1 text-sm border-2 border-black">Name</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrenciesScreen;
