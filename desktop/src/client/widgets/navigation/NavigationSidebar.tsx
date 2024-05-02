import React from 'react';
import { NavLink } from 'react-router-dom';

import { useWallets } from '../../queries/wallets-queries';
import CreateCurrencyButton from '../create-currency/CreateCurrencyButton';
import CreateWalletButton from '../create-wallet/CreateWalletButton';

const NavigationSidebar = () => {
  const { data: walletsList } = useWallets();

  return (
    <div className="px-5 w-52 h-full border-r-2 border-black">
      <div className="pt-10 flex justify-center items-center">
        <NavLink to="/">
          <div className="h-20 w-20 border-2 border-black rounded-full" />
        </NavLink>
      </div>

      <ul className="mt-10">
        <li>
          <NavLink
            to="/connections"
            className={({ isActive }) =>
              `${isActive ? 'text-white bg-black' : ''} hover:underline`
            }
            end
          >
            Connections
          </NavLink>
        </li>

        <li className="w-full inline-flex justify-between items-center">
          <NavLink
            to="/currencies"
            className={({ isActive }) =>
              `${isActive ? 'text-white bg-black' : ''} hover:underline`
            }
            end
          >
            Currencies
          </NavLink>

          <CreateCurrencyButton />
        </li>

        <li className="w-full inline-block">
          <div className="w-full inline-flex justify-between items-center">
            <NavLink
              to="/wallets"
              className={({ isActive }) =>
                `${isActive ? 'text-white bg-black' : ''} hover:underline`
              }
              end
            >
              Wallets
            </NavLink>

            <CreateWalletButton />
          </div>

          {walletsList ? (
            <ul className="pl-5">
              {walletsList.map((wallet) => (
                <li key={wallet.id} className="text-sm">
                  <NavLink
                    to={`/wallets/${wallet.id}`}
                    className={({ isActive }) =>
                      `${isActive ? 'text-white bg-black' : ''} hover:underline`
                    }
                    end
                  >
                    {wallet.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      </ul>
    </div>
  );
};

export default NavigationSidebar;
