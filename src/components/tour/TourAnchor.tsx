'use client';

import type { HTMLAttributes, PropsWithChildren } from 'react';

interface TourAnchorProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  id: string;
  /** Optional suffix for responsive variants (e.g., "desktop", "mobile") */
  variant?: string;
}

const TourAnchor = ({ id, variant = 'default', children, ...rest }: TourAnchorProps) => {
  const dataId = `${id}-${variant}`;

  return (
    <div data-tour-id={dataId} {...rest}>
      {children}
    </div>
  );
};

export default TourAnchor;
