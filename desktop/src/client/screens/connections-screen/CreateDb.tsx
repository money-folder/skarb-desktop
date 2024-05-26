import React from 'react';

import { useCreateConnection } from '../../queries/db-source-queries';

const CreateDb = () => {
  const { mutateAsync } = useCreateConnection();

  const onClick = async () => {
    await mutateAsync();
  };

  return (
    <button className="cursor-pointer hover:underline" onClick={onClick}>
      Create DB
    </button>
  );
};

export default CreateDb;
