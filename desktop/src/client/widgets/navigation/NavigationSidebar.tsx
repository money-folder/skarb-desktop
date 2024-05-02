import React from 'react';
import { NavLink } from 'react-router-dom';

import { useWallets } from '../../queries/wallets-queries';

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

        <li>
          <NavLink
            to="/currencies"
            className={({ isActive }) =>
              `${isActive ? 'text-white bg-black' : ''} hover:underline`
            }
            end
          >
            Currencies
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/wallets"
            className={({ isActive }) =>
              `${isActive ? 'text-white bg-black' : ''} hover:underline`
            }
            end
          >
            Wallets
          </NavLink>

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
