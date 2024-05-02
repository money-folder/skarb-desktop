import React from 'react';

// queries
import {
  useCurrencies,
  useHardDeleteCurrency,
  useRestoreCurrency,
  useSoftDeleteCurrency,
} from '../../queries/currencies-queries';

// widgets
import CreateCurrencyButton from '../../widgets/create-currency/CreateCurrencyButton';

// icons
import CrossIcon from '../../assets/cross.svg';
import RestoreIcon from '../../assets/restore.svg';
import TrashIcon from '../../assets/trash.svg';

const CurrenciesScreen = () => {
  const {
    data: currencies,
    isError: isCurrenciesError,
    isLoading: isCurrenciesLoading,
  } = useCurrencies();

  const { mutateAsync: softDeleteCurrency } = useSoftDeleteCurrency();
  const { mutateAsync: restoreCurrency } = useRestoreCurrency();
  const { mutateAsync: hardDeleteCurrency } = useHardDeleteCurrency();

  const onSoftDeleteClick = async (currencyId: string) => {
    await softDeleteCurrency(currencyId);
  };

  const onRestoreClick = async (currencyId: string) => {
    await restoreCurrency(currencyId);
  };

  const onHardDeleteClick = async (currencyId: string) => {
    await hardDeleteCurrency(currencyId);
  };

  if (isCurrenciesLoading) {
    return <div>Loading...</div>;
  }

  if (isCurrenciesError || !currencies) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-center font-extrabold text-xl">Currencies</h2>

      <div className="mt-10 w-full flex flex-col items-center">
        <div className="w-2/3">
          <CreateCurrencyButton text="Create Currency" />
        </div>

        <table className="mt-5 w-2/3">
          <thead>
            <tr>
              <th className="p-1 text-sm border-2 border-black">Name</th>
              <th className="p-1 text-sm border-2 border-black">Created At</th>
              <th className="p-1 text-sm border-2 border-black">Deleted At</th>
              <th className="p-1 text-sm border-2 border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency.id}>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${currency.deletedAt ? 'opacity-30' : ''}`}
                >
                  {currency.name}
                </td>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${currency.deletedAt ? 'opacity-30' : ''}`}
                >
                  {currency.createdAt}
                </td>
                <td
                  className={`p-1 text-sm text-center border-2 border-black ${currency.deletedAt ? 'opacity-30' : ''}`}
                >
                  {currency.deletedAt || '-'}
                </td>

                <td className="p-1 space-x-2 text-sm text-center border-2 border-black">
                  {currency.deletedAt ? (
                    <>
                      <button
                        className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => onRestoreClick(`${currency.id}`)}
                      >
                        <img src={RestoreIcon} alt="restore" />
                      </button>

                      <button
                        className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => onHardDeleteClick(`${currency.id}`)}
                      >
                        <img src={TrashIcon} alt="trash" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => onSoftDeleteClick(`${currency.id}`)}
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

export default CurrenciesScreen;
