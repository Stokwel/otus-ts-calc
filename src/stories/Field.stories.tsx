import React from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {Field, FieldProps} from '../component/Field';

export default {
  title: 'Field',
  component: Field,
} as Meta;

const Template: Story<FieldProps> = (args) => <Field {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  cells: [
    [true, false, true, true, true],
    [false, false, true, false, true],
    [true, true, false, true, false],
    [true, false, false, true, false],
    [false, false, true, true, false],
  ]
};
