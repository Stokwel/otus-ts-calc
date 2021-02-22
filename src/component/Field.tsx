import React, {FC} from "react";
import styled from "@emotion/styled";
import {Cell} from "./Cell";

export interface FieldProps {
    cells: boolean[][];
    onClick: (x: number, y: number) => void;
}

const FieldWrapper = styled.div`
  padding: 10px;
  border: 2px solid black;
  display: inline-block;
`;

export const Field: FC<FieldProps> = ({cells, onClick}) => (
    <FieldWrapper>
        {
            cells?.map((row, x) => [
                ...row?.map((isFilled: boolean, y) => (
                    <Cell key={`${x}_${y}`} isFilled={isFilled} x={x} y={y} onClick={onClick}>
                    </Cell>
                )),
            x !== row.length - 1 ? <br key={x}/> : null,
            ])
        }
    </FieldWrapper>
);
