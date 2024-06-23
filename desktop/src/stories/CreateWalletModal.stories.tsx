import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateWalletModal from '../client/widgets/create-wallet/CreateWalletModal';

const queryClient = new QueryClient();

const meta = {
  title: 'CreateWalletModal',
  component: CreateWalletModal,
} satisfies Meta<typeof CreateWalletModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const main: Story = {
  args: {
    close: fn(),
  },

  decorators: [
    (story) => (
      <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
    ),
  ],
};
