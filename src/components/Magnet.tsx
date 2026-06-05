import { useRef, useState, ReactNode, MouseEvent } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export default function Magnet({
  children,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: 'translate3d(0,0,0)',
    transition: inactiveTransition,
    willChange: 'transform' as const,
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    setStyle({
      transform: `translate3d(${distX / strength}px, ${distY / strength}px, 0)`,
      transition: activeTransition,
      willChange: 'transform',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'translate3d(0,0,0)',
      transition: inactiveTransition,
      willChange: 'transform',
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
