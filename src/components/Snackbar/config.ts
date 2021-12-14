export const shortDuration = 1000;
export const normalDuration = 3000;
export const longDuration = 5000;

export type IDuration = number | 'short' | 'normal' | 'long';
export function durationToMs(duration: IDuration): number{
    if (duration === 'short') return shortDuration;
    else if (duration ==='normal') return normalDuration;
    else if (duration ==='long') return longDuration;
    else return duration;
  }
  