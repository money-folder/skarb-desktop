import type { Meta, StoryObj } from '@storybook/react';

import PrimaryButton from '../../client/components/buttons/PrimaryButton';

const meta = {
  title: 'PrimaryButton',
  component: PrimaryButton,
} satisfies Meta<typeof PrimaryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Submit: Story = {
  args: {
    text: 'Submit',
    type: 'submit',
  },
};

export const Button: Story = {
  args: {
    text: 'Button',
    type: 'button',
  },
};
