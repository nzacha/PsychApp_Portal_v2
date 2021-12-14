import { Grid, GridDirection } from '@mui/material';
import React, { ReactElement } from 'react';

export interface IGridElement {
  id: string;
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  element: ReactElement;
  justify?: 'center' | 'flex-start' | 'space-between' | 'flex-end';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

interface IGridLayout {
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  elements: IGridElement[];
  justify?: 'center' | 'flex-start' | 'space-between' | 'flex-end';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  rowSpacing?: number;
  columnSpacing?: number;
  spacing?: number;
  direction?: GridDirection;
  style?: React.CSSProperties;
}

export default function GridLayout(props: IGridLayout):ReactElement {
  return (
    <Grid 
      container 
      direction={props.direction || 'row'}
      justifyContent={props.justify ?? 'center'}
      alignContent={props.alignItems ?? 'flex-start'} 
      style={props.style}
    >
      {props.elements.map((el) => (
        <Grid 
          key={el.id}
          item
          xl={el.xl}
          lg={el.lg}
          md={el.md}
          sm={el.sm}
          xs={el.xs}
        >
          <Grid 
            container 
            justifyContent={el.justify}
            alignItems={el.alignItems}
            px={(props?.columnSpacing  ?? 1) / 2}
            py={(props?.rowSpacing ?? 1) / 2}
          >
            {el.element}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}