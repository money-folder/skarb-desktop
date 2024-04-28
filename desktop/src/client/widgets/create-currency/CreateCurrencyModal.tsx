import React from 'react';

import Overlay from '../../components/overlay/Overlay';
import CreateCurrencyForm from './CreateCurrencyForm';

interface Props {
  close: () => void;
}

const CreateCurrencyModal = ({ close }: Props) => {
  return (
    <div onClick={close}>
      <Overlay>
        <div
          className="p-5 w-96 bg-white rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-left font-bold text-lg">Create Currency</h3>
          <CreateCurrencyForm close={close} />
        </div>
      </Overlay>
    </div>
  );
};

export default CreateCurrencyModal;
