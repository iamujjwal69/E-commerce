export default function StarRating({ rating, reviewCount, size = 'sm' }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3 && rating % 1 < 0.8;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  const starSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className="flex items-center gap-1">
      <div className={`flex items-center ${starSize}`} style={{ color: '#f3a847' }}>
        {'★'.repeat(fullStars)}
        {hasHalf && '½'}
        <span style={{ color: '#ddd' }}>{'★'.repeat(emptyStars)}</span>
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs" style={{ color: '#007185' }}>
          {reviewCount.toLocaleString()}
        </span>
      )}
    </div>
  );
}
