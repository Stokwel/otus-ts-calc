import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Game, GameProps } from "../component/Game";

export default {
  title: "Game",
  component: Game,
} as Meta;

const Template: Story<GameProps> = (args) => <Game {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isLive: true,
  size: 5,
  chanceOfLive: 1,
  maxLivesPercent: 0.5,
};
