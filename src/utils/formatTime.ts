import { format, parse } from 'date-fns';

export default function formatTime(dateString: string, formatString: string) {
  return format(parse(dateString), formatString);
}
