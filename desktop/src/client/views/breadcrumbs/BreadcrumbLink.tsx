import React from 'react';

interface BreadcrumbsLinkProps {
  text: string;
  onClick: () => void;
}

const BreadcrumbsLink = ({ text, onClick }: BreadcrumbsLinkProps) => (
  <button
    className="text-gray-700 cursor-pointer hover:text-black hover:underline"
    onClick={onClick}
  >
    {text}
  </button>
);

export default BreadcrumbsLink;
