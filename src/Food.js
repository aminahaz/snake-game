import React from 'react';

export default (props) => {

  const style = {
    left: `${props.dot[0]}%`, //x cordinate
    top: `${props.dot[1]}%` //y cordinate
  }

  return (
    <div className="snake-food" style={style}></div> //food wordt gerenderd met classename snake-food.
  )
}