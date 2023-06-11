import { formatDistanceToNow } from 'date-fns';

export const formatDistanceTimeFromNow = (date: string) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};
