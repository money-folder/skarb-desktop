import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

// queries
import { useCreateCurrency } from '../../queries/currencies-queries';

// components
import SecondaryButton from '../../components/buttons/SecondaryButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';

interface Props {
  close: () => void;
}

const CreateCurrencyForm = ({ close }: Props) => {
  const { register, handleSubmit } = useForm();

  const { mutateAsync } = useCreateCurrency();

  const onSubmit = async (data: FieldValues) => {
    await mutateAsync(data.name);

    close();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="mt-2 w-full flex flex-col items-start">
          <span>Name: </span>
          <input
            {...register('name', { required: true })}
            className="px-2 border-[1px] border-black rounded-sm"
          />
        </label>

        <div className="mt-5 flex justify-end gap-2">
          <SecondaryButton text="Cancel" onClick={close} />
          <PrimaryButton type="submit" text="Submit" />
        </div>
      </div>
    </form>
  );
};

export default CreateCurrencyForm;
