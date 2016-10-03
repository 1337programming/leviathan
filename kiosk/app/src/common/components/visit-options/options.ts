export const OPTIONS = [
  {
    disabled: true,
    description: 'I\' a new customer',
    title: 'New Customer',
    route: null
  },
  {
    disabled: true,
    description: 'I ran out of data',
    title: 'Data Upgrade',
    route: null
  },
  {
    disabled: false,
    description: 'My bill is too high',
    title: 'Account Edit',
    route: 'account'
  },
  {
    disabled: true,
    description: 'I want a new phone',
    title: 'New Phone',
    route: null
  },
  {
    disabled: false,
    description: 'I need to add funds',
    title: 'Add Funds',
    route: 'add-funds'
  }
];

export interface Option {
  disabled: boolean;
  description: string;
  title: string;
  route: string;
}
