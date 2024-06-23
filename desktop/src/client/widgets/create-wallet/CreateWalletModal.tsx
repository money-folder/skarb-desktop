import React from 'react';

import Overlay from '../../components/overlay/Overlay';
import CreateWalletForm from './CreateWalletForm';

interface Props {
  close: () => void;
}

const CreateWalletModal = ({ close }: Props) => {
  return (
    <div onClick={close}>
      <Overlay>
        <div
          className="p-5 w-96 bg-white rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-left font-bold text-lg">Create Wallet</h3>
          <CreateWalletForm close={close} />
        </div>
      </Overlay>
    </div>
  );
};

export default CreateWalletModal;
