import React, { useContext } from 'react';

import { OverlayContext } from '../../components/overlay/OverlayProvider';
import CreateItemButton from '../../components/buttons/CreateItemButton';
import CreateCurrencyModal from './CreateCurrencyModal';

interface Props {
  text?: string;
}

const CreateCurrencyButton = ({ text }: Props) => {
  const { addOverlay } = useContext(OverlayContext);

  const onClick = () => {
    addOverlay(({ removeSelf }) => <CreateCurrencyModal close={removeSelf} />);
  };

  return <CreateItemButton text={text} onClick={onClick} />;
};

export default CreateCurrencyButton;
