import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { Instance } from '@popperjs/core';

interface IAnchoredTooltipProps{
    message: string;
    // placement: TooltipProps['placement'] | 'auto';
}
export default function AnchoredTooltip(props: React.PropsWithChildren<IAnchoredTooltipProps>) {
  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef<Instance>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const [placement, setPlacement] = React.useState<'top' | 'bottom'>('bottom');
  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }

    if(areaRef.current != null){
      if(positionRef.current.y > areaRef.current!.getBoundingClientRect().y + areaRef.current!.getBoundingClientRect().height /2){
        setPlacement('top');
      }else{
        setPlacement('bottom');
      }
    }
  };

  return (
    <Tooltip
      title={props.message}
      placement={placement}
      arrow
      PopperProps={{
        popperRef,
        anchorEl: {
          getBoundingClientRect: () => {
            return new DOMRect(
              positionRef.current.x,
              areaRef.current!.getBoundingClientRect()[placement],
              0,
              0,
            );
          },
        },
      }}
    >
      <Box
        ref={areaRef}
        onMouseMove={handleMouseMove}
      >
        {props.children}
      </Box>
    </Tooltip>
  );
}