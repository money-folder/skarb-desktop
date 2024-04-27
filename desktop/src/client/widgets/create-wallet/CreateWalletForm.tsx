import React from 'react';
import { useForm } from 'react-hook-form';

// types
import { Currency } from '../../types/currencies';

// components
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';

interface Props {
  currencies: Currency[];
  close: () => void;
}

const CreateWalletForm = ({ currencies, close }: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {};

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

        <label className="mt-2 w-full flex flex-col items-start">
          <span>Currency: </span>
          <select
            {...register('currency', { required: true })}
            className="px-2 border-[1px] border-black rounded-sm"
          >
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>
                {currency.name}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-5 flex justify-end gap-2">
          <SecondaryButton text="Cancel" onClick={close} />
          <PrimaryButton type="submit" text="Submit" />
        </div>
      </div>
    </form>
  );
};

export default CreateWalletForm;
