import React from 'react';

import { useLinkDbSource } from '../../queries/db-source-queries';

const LinkSource = () => {
  const linkDbSourceMutation = useLinkDbSource();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const file = files[0];
    if (!file) {
      return;
    }

    // electron adds a 'path' property to the file object
    // @ts-ignore
    await linkDbSourceMutation.mutateAsync(file.path);
  };
  return (
    <label className="cursor-pointer hover:underline">
      Link a Source
      <input className="hidden" type="file" onChange={onChange} />
    </label>
  );
};

export default LinkSource;
