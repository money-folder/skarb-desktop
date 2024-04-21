import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { getLocalISOString } from '../../utils';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';

interface Props {
  close: () => void;
}

const AddWhistoryForm = ({ close }: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (e: FieldValues) => {
    console.log(e);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="mt-2 w-full flex flex-col items-start">
          <span>Timestamp: </span>
          <input
            {...register('date', { required: true, valueAsDate: true })}
            className="px-2 border-[1px] border-black rounded-sm"
            type="datetime-local"
            defaultValue={getLocalISOString(new Date())}
          />
        </label>

        <label className="w-full flex flex-col items-start">
          <span>Amount: </span>
          <input
            {...register('amount', { required: true, valueAsNumber: true })}
            className="px-2 border-[1px] border-black rounded-sm"
            type="number"
          />
        </label>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <SecondaryButton text="Cancel" />
        <PrimaryButton type="submit" text="Submit" />
      </div>
    </form>
  );
};

export default AddWhistoryForm;
