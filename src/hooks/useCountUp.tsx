import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  decimals = 0,
  suffix = '',
  prefix = '',
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration;

      const tick = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function (easeOutQuart)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = start + (end - start) * easeOutQuart;
        
        setCount(currentCount);

        if (now < endTime) {
          requestAnimationFrame(tick);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, start, end, duration, delay]);

  const formattedCount = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { count, formattedCount, ref, isVisible };
}

// Helper function to parse stat strings like "78%", "3x", "15+", "24/7"
export function parseStatValue(stat: string): { value: number; suffix: string; prefix: string } {
  // Handle ranges like "5-7" - take the higher number
  if (stat.includes('-') && !stat.includes('/')) {
    const parts = stat.split('-');
    const endVal = parseFloat(parts[1]);
    return { value: endVal, suffix: '', prefix: parts[0].replace(/\d/g, '') };
  }
  
  // Handle fractions like "24/7" - show as is
  if (stat.includes('/')) {
    return { value: 0, suffix: stat, prefix: '' };
  }
  
  // Extract numeric value and suffix
  const match = stat.match(/^([^\d]*)?(\d+\.?\d*)([^\d]*)$/);
  if (match) {
    const prefix = match[1] || '';
    const value = parseFloat(match[2]);
    const suffix = match[3] || '';
    return { value, suffix, prefix };
  }
  
  return { value: 0, suffix: stat, prefix: '' };
}

// Animated number component
interface AnimatedNumberProps {
  value: string | number;
  duration?: number;
  delay?: number;
  className?: string;
}

export function AnimatedNumber({ value, duration = 2000, delay = 0, className = '' }: AnimatedNumberProps) {
  const { formattedCount, ref } = useCountUp({
    end: typeof value === 'number' ? value : parseStatValue(String(value)).value,
    duration,
    delay,
    suffix: typeof value === 'string' ? parseStatValue(value).suffix : '',
    prefix: typeof value === 'string' ? parseStatValue(value).prefix : '',
  });

  // Handle special cases that shouldn't animate
  const isSpecialCase = typeof value === 'string' && (value.includes('/') || value.includes('-'));
  
  if (isSpecialCase) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {formattedCount}
    </span>
  );
}
