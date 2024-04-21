import type { Meta, StoryObj } from '@storybook/react';

import SecondaryButton from '../../client/components/buttons/SecondaryButton';

const meta = {
  title: 'SecondaryButton',
  component: SecondaryButton,
} satisfies Meta<typeof SecondaryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Cancel: Story = {
  args: {
    text: 'Cancel',
  },
};
