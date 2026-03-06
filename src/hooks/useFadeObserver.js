import { useEffect } from 'react';

export default function useFadeObserver(containerRef) {
  useEffect(() => {
    const container = containerRef?.current || document;
    const elements = container.querySelectorAll('.fade,.fade-left,.fade-right,.fade-scale');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);
}
