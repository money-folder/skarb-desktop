import React from 'react';

interface SecondaryButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SecondaryButton = ({ text, onClick }: SecondaryButtonProps) => {
  return (
    <button
      className="px-5 py-2 text-black border-[1px] border-black cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
