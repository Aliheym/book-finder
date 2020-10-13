import React, { useState } from 'react';

function Rating({
  defaultRating,
  maxRating = 1,
  disabled,
  size = 'huge',
  onRate,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const onIconClick = (index) => {
    if (disabled) return;

    setRating(index + 1);
    setSelectedIndex(-1);

    if (onRate) onRate(index + 1);
  };

  const onIconPointerEnter = (index) => {
    if (disabled) return;

    setSelectedIndex(index);
  };

  const onIconPointerLeave = () => {
    if (disabled) return;

    setSelectedIndex(-1);
  };

  let className = `ui star rating ${size}`;

  if (selectedIndex > -1) className += ' selected';

  return (
    <div className={className} onPointerLeave={onIconPointerLeave}>
      {Array.from({ length: maxRating }, (_, i) => {
        let className = 'icon';

        if (selectedIndex >= i) className += ' selected';
        if (rating > i) className += ' active';

        return (
          <i
            tabIndex={disabled ? -1 : 0}
            key={i}
            className={className}
            onClick={() => onIconClick(i)}
            onPointerEnter={() => onIconPointerEnter(i)}
          />
        );
      })}
    </div>
  );
}

export default Rating;
