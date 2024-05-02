import React, { useContext } from 'react';

import CreateCurrencyModal from './CreateCurrencyModal';
import { OverlayContext } from '../../components/overlay/OverlayProvider';

// icons
import PlusIcon from '../../assets/plus.svg';

interface Props {
  text?: string;
}

const CreateCurrencyButton = ({ text }: Props) => {
  const { addOverlay } = useContext(OverlayContext);

  const onClick = () => {
    addOverlay(({ removeSelf }) => <CreateCurrencyModal close={removeSelf} />);
  };

  return (
    <button
      className="inline-flex items-center space-x-2 cursor-pointer opacity-75 hover:underline hover:opacity-100"
      onClick={onClick}
    >
      <img className="w-4 h-4" src={PlusIcon} alt="plus" />
      {text ? <span>{text}</span> : null}
    </button>
  );
};

export default CreateCurrencyButton;
