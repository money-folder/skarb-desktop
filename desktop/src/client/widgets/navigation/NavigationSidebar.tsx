import React from 'react';
import { NavLink } from 'react-router-dom';

// queries
import { useWallets } from '../../queries/wallets-queries';
import { useCurrentConnection } from '../../queries/db-source-queries';

import CreateWalletButton from '../create-wallet/CreateWalletButton';
import AddWhistoryButton from '../add-whistory/AddWhistoryButton';

const NavigationSidebar = () => {
  const { data: walletsList } = useWallets();
  const { data: currentConnection } = useCurrentConnection();

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

        <li
          className={`w-full inline-block ${!currentConnection ? 'pointer-events-none opacity-50' : ''} `}
        >
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
                <li
                  key={wallet.id}
                  className={`w-full inline-flex justify-between items-center text-sm ${!currentConnection ? 'pointer-events-none opacity-50' : ''} `}
                >
                  <NavLink
                    to={`/wallets/${wallet.id}`}
                    className={({ isActive }) =>
                      `${isActive ? 'text-white bg-black' : ''} hover:underline`
                    }
                    end
                  >
                    {wallet.name}
                  </NavLink>

                  <AddWhistoryButton walletId={`${wallet.id}`} />
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
