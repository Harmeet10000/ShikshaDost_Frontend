import React from 'react'

const FlipCard = ({ isFlipped, frontSide, backSide }) => {
  return (
    <div className={`flip-card  ${isFlipped ? 'flipped' : ''}`}>
    <div className="flip-card-inner">
      <div className="flip-card-front">{frontSide}</div>
      <div className="flip-card-back">{backSide}</div>
    </div>
  </div>
  )
}

export default FlipCard