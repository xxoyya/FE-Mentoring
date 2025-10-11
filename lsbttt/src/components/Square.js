import React, { useState } from 'react';
import './Square.css';

import iconX from '../assets/icon_x.png';
import iconO from '../assets/icon_o.png';
import iconXOutline from '../assets/icon-x-outline.png';
import iconOOutline from '../assets/icon-o-outline.png';

const Square = ({ value, onClick, currentTurn }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (!value) setIsHovered(true);
  };
  const handleMouseLeave = () => setIsHovered(false);

  let content = null;
  if (value === 'X') {
    content = <img src={iconX} alt="X" className="symbol" />;
  } else if (value === 'O') {
    content = <img src={iconO} alt="O" className="symbol" />;
  } else if (isHovered) {
    const hoverIcon = currentTurn === 'X' ? iconXOutline : iconOOutline;
    content = <img src={hoverIcon} alt="Hover symbol" className="hover-symbol" />;
  }

  return (
    <div
      className="square"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </div>
  );
};

export default Square;