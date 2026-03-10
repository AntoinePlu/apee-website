'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import type { SpringOptions } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightProps = {
  className?: string;
  size?: number;
  color?: string;
  springOptions?: SpringOptions;
};

export function Spotlight({
  className,
  size = 200,
  color = 'rgba(255,255,255,0.25)',
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);

    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', onEnter);
    parentElement.addEventListener('mouseleave', onLeave);

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', onEnter);
      parentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      className={cn('pointer-events-none absolute rounded-full', className)}
      animate={{ opacity: isHovered ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        background: `radial-gradient(circle at center, ${color}, transparent 80%)`,
      }}
    />
  );
}
