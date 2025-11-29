import React from 'react'

const TwoProgressBars = ({type, original, newWidth}) => {
  return (
    <div className="progress-bars">
      <span
        className="progress-1"
        style={{
          backgroundColor: "hsl(252, 7%, 13%)",
          width: `${original}%`,
        }}
      ></span>
      <span
        className="progress-2"
        style={{
          backgroundColor:
            type === "add" ? "hsl(177, 52%, 32%)" : "hsl(7, 58%, 50%)",
          width: `${newWidth}%`,
        }}
      ></span>
    </div>
  );
}

export default TwoProgressBars