import React, {FC} from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/core";

const baseStyle = css`
  width: 25px;
  height: 25px;
  border: 1px solid;
  display: inline-block;
  margin: 5px;
  border-radius: 5px;
`;

const emptyStyle = css`
  background-color: white;
`;

const filledStyle = css`
  background-color: black;
`;

interface StyleProps {
    isFilled: boolean;
}

function onClickAction(x: number, y: number): void
{
    console.info(`${x} - ${y}`);
}

export const CellWrapper = styled.button<StyleProps>`
  ${baseStyle};
  ${({isFilled}) => (isFilled ? filledStyle : emptyStyle)};
`;

export interface CellProps {
    isFilled: boolean;
    x: number;
    y: number;
}

export const Cell: FC<CellProps> = ({isFilled, x, y}) => (
    <CellWrapper
        isFilled={isFilled}
        onClick={() => onClickAction(x, y)}
    >
    </CellWrapper>
);
