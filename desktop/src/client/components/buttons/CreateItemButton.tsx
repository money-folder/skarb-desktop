import React, { useContext } from 'react';

// icons
import PlusIcon from '../../assets/plus.svg';

interface Props {
  text?: string;
  onClick: () => void;
}

const CreateItemButton = ({ text, onClick }: Props) => (
  <button
    className="inline-flex items-center space-x-2 cursor-pointer opacity-75 hover:underline hover:opacity-100"
    onClick={onClick}
  >
    <img className="w-4 h-4" src={PlusIcon} alt="plus" />
    {text ? <span>{text}</span> : null}
  </button>
);

export default CreateItemButton;
