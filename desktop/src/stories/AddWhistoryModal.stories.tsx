import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import AddWhistoryModal from '../client/widgets/add-whistory/AddWhistoryModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta = {
  title: 'AddWhistoryModal',
  component: AddWhistoryModal,
} satisfies Meta<typeof AddWhistoryModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const main: Story = {
  args: {
    walletId: '',
    close: fn(),
  },

  decorators: [
    (story) => (
      <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
    ),
  ],
};
