import React, { useContext } from 'react';

import { useCurrencies } from '../../queries/currencies-queries';

import CreateItemButton from '../../components/buttons/CreateItemButton';
import { OverlayContext } from '../../components/overlay/OverlayProvider';
import CreateWalletModal from './CreateWalletModal';

interface Props {
  text?: string;
}

const CreateWalletButton = ({ text }: Props) => {
  const { addOverlay } = useContext(OverlayContext);

  const { data: currencies } = useCurrencies();

  const onClick = () => {
    addOverlay(({ removeSelf }) => (
      <CreateWalletModal currencies={currencies!} close={removeSelf} />
    ));
  };

  return <CreateItemButton text={text} onClick={onClick} />;
};

export default CreateWalletButton;
