import { FC, useState } from 'react';

interface HoverProps {
  children: (boolean: boolean) => JSX.Element
}

const Hover: FC<HoverProps> = ( { children }: HoverProps) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      style={{ display: 'contents' }} //нужен, чтобы потомок использовался вместо род.
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children(hover)}
    </div>
  );
}

export default Hover;