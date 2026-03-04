import { useState, useRef, useEffect } from 'react';

interface ImageCompareSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
}

export default function ImageCompareSlider({
  beforeImage,
  afterImage,
  beforeLabel = '术前',
  afterLabel = '术后',
  initialPosition = 50
}: ImageCompareSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {afterImage ? (
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-contain"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center border"
            style={{ backgroundColor: '#B9CBDC', borderColor: '#A0A7B5' }}
          >
            <span className="text-gray-500 text-sm">{afterLabel}</span>
          </div>
        )}
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <div className="relative w-full h-full">
          {beforeImage ? (
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="absolute inset-0 w-full h-full object-contain"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center border"
              style={{
                backgroundColor: '#D4A574',
                borderColor: '#A0A7B5'
              }}
            >
              <span className="text-gray-500 text-sm">{beforeLabel}</span>
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 cursor-ew-resize"
        style={{
          left: `${sliderPosition}%`,
          backgroundColor: 'transparent',
          width: '2px',
          transform: 'translateX(-50%)',
          zIndex: 10
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 flex items-center gap-0.5"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="drop-shadow-md">
            <path d="M7 2L3 6L7 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="drop-shadow-md">
            <path d="M5 2L9 6L5 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
