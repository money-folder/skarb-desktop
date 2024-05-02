import React from 'react';
import { Link } from 'react-router-dom';

const NavigationSidebar = () => {
  return (
    <div className="px-5 w-52 h-full border-r-2 border-black">
      <div className="pt-10 flex justify-center items-center">
        <Link to="/">
          <div className="h-20 w-20 border-2 border-black rounded-full" />
        </Link>
      </div>

      <ul className="mt-10">
        <li>
          <Link to="/connections" className="hover:underline">
            Connections
          </Link>
        </li>

        <li>
          <Link to="/currencies" className="hover:underline">
            Currencies
          </Link>
        </li>

        <li>
          <Link to="/wallets" className="hover:underline">
            Wallets
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationSidebar;
