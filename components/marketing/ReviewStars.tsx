import { Star } from 'lucide-react';

export interface ReviewStarsProps {
  note: number;
  totalStars: number;
  className?: string;
}

export const ReviewStars = ({
  note,
  totalStars,
  className,
}: ReviewStarsProps) => {
  return (
    <div className={'flex items-center gap-2'}>
      <p className={'text-primary text-sm'}>{note}</p>
      <div className={'flex items-center'}>
        {Array.from({ length: totalStars }).map((_, index) => {
          const filled = index + 1 <= note;
          return (
            <Star className={className} key={index} data-fill={`${filled}`} />
          );
        })}
      </div>
    </div>
  );
};
