import React from 'react';

// stores
import { useActiveWalletStore } from '../../stores/active-wallet-store';

// queries
import { useWallet } from '../../queries/wallets-queries';

// components
import BreadcrumbsLink from './BreadcrumbLink';

const Breadcrumbs = () => {
  const activeWalletId = useActiveWalletStore((store) => store.activeWalletId);
  const setActiveWalletId = useActiveWalletStore(
    (store) => store.setActiveWalletId,
  );

  // get wallet by id from the useQuery
  const { data: wallet } = useWallet(activeWalletId || '');

  return (
    <ul className="px-8 flex gap-8 items-center list-disc">
      <li>
        <BreadcrumbsLink text="Home" onClick={() => setActiveWalletId(null)} />
      </li>
      <li>
        <BreadcrumbsLink
          text="Wallets"
          onClick={() => setActiveWalletId(null)}
        />
      </li>
      {wallet ? (
        <li>
          <BreadcrumbsLink
            text={wallet.name}
            onClick={() => setActiveWalletId(null)}
          />
        </li>
      ) : null}
    </ul>
  );
};

export default Breadcrumbs;
