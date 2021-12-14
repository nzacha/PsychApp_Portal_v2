import { Grid} from '@mui/material';
import React from 'react';

interface IProps{
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    children: React.ReactElement;
    justify?: 'center' | 'flex-start' | 'space-between' | 'flex-end';
    alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
    direction?: 'row' | 'column';
    fullWidth?: boolean;
    fullHeight?: boolean;
    containerStyle?: React.CSSProperties;
    style?: React.CSSProperties;
}
const Container: React.FC<IProps> = (props: IProps) => {
    const {width, height, ...containerStyle} = props.containerStyle ?? {width: null, height: null};
    const style = props.style;

    return (
        <Grid 
            container 
            direction={props.direction ?? 'row'}
            justifyContent={props.justify ?? 'center'}
            justifyItems={props.justify ?? 'center'}
            alignContent={props.alignItems ?? 'center'}
            alignItems={props.alignItems ?? 'center'}
            style={{ height: '100%', width: '100%', ...containerStyle }}
        >       
            <Grid item 
                xl={props.xl}
                lg={props.lg}
                md={props.md}
                sm={props.sm}
                xs={props.xs}
                style={{
                    ...(props.fullWidth ? {width: '100%'} : {}), 
                    ...(props.fullHeight ? {height: '100%'} : {}),
                    ...style
                }}
            >
                {props.children}
            </Grid>
        </Grid>
    );
}

export default Container;