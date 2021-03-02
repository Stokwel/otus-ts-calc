import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {Cell, CellProps} from '../component/Cell';

export default {
    title: 'Cell',
    component: Cell,
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const Filled = Template.bind({});
Filled.args = {
    isFilled: true,
    x: 100,
    y: 100
};

export const NotFilled = Template.bind({});
NotFilled.args = {
    isFilled: false,
    x: 100,
    y: 100
};
