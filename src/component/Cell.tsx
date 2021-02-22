import React, {FC} from "react";
import styled from "@emotion/styled";
import {css} from "@emotion/core";

const BaseStyle = css`
  width: 25px;
  height: 25px;
  border: 1px solid;
  display: inline-block;
  margin: 5px;
  border-radius: 5px;
`;

const EmptyStyle = css`
  background-color: white;
`;

const FilledStyle = css`
  background-color: black;
`;

interface StyleProps {
    isFilled: boolean;
}

export const CellWrapper = styled.button<StyleProps>`
  ${BaseStyle};
  ${({isFilled}) => (isFilled ? FilledStyle : EmptyStyle)};
`;

export interface CellProps {
    isFilled: boolean;
    x: number;
    y: number;
    onClick: (x: number, y: number) => void;
}

export const Cell: FC<CellProps> = ({isFilled, x, y, onClick}) => (
    <CellWrapper
        isFilled={isFilled}
        onClick={() => onClick(x, y)}
    >
    </CellWrapper>
);
