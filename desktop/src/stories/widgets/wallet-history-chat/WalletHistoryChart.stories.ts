import type { Meta, StoryObj } from '@storybook/react';

import { whistoryList, whistoryList2 } from './data';
import WalletHistoryChart from '../../../client/widgets/wallet-history-chart/WalletHistoryChart';

const meta = {
  title: 'WalletHistoryChart',
  component: WalletHistoryChart,
} satisfies Meta<typeof WalletHistoryChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const main: Story = {
  args: {
    list: whistoryList,
    width: 600,
    height: 350,
  },
};
