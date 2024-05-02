import React, { useContext } from 'react';

import CreateItemButton from '../../components/buttons/CreateItemButton';
import { OverlayContext } from '../../components/overlay/OverlayProvider';
import AddWhistoryModal from './AddWhistoryModal';

interface Props {
  walletId: string;
  text?: string;
}

const AddWhistoryButton = ({ walletId, text }: Props) => {
  const { addOverlay } = useContext(OverlayContext);

  const onClick = () => {
    addOverlay(({ removeSelf }) => (
      <AddWhistoryModal walletId={walletId} close={removeSelf} />
    ));
  };

  return <CreateItemButton text={text} onClick={onClick} />;
};

export default AddWhistoryButton;
