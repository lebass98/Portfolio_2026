import { useState, useEffect } from 'react';

const Typewriter = ({ texts, speed = 150, delay = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(text.substring(0, displayText.length + 1));
        if (displayText.length + 1 === text.length) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        setDisplayText(text.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, speed, delay]);

  return (
    <span className="typewriter">
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

export default Typewriter;
