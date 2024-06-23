import React, { useContext } from 'react';

import CreateItemButton from '../../components/buttons/CreateItemButton';
import { OverlayContext } from '../../components/overlay/OverlayProvider';
import CreateWalletModal from './CreateWalletModal';

interface Props {
  text?: string;
}

const CreateWalletButton = ({ text }: Props) => {
  const { addOverlay } = useContext(OverlayContext);

  const onClick = () => {
    addOverlay(({ removeSelf }) => <CreateWalletModal close={removeSelf} />);
  };

  return <CreateItemButton text={text} onClick={onClick} />;
};

export default CreateWalletButton;
