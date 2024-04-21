import React from 'react';

// components
import Overlay from '../../components/overlay/Overlay';
import AddWhistoryForm from './AddWhistoryForm';

interface Props {
  close: () => void;
}

const AddWhistoryModal = ({ close }: Props) => {
  return (
    <div onClick={close}>
      <Overlay>
        <div
          className="p-5 w-96 bg-white rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-left font-bold text-lg">New Wallet Entry</h3>
          <AddWhistoryForm close={close} />
        </div>
      </Overlay>
    </div>
  );
};

export default AddWhistoryModal;
