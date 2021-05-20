import React from 'react';

export default (props) => {
  return (
    <div>
      {props.snakeDots.map((dot, i) => { //map method wordt gebruikt om door de dots van de snake te loopen 
        const style = {
          left: `${dot[0]}%`, //x cordinate
          top: `${dot[1]}%` //y cordinate 
        }
        return (
          <div className="snake-dot" key={i} style={style}></div> //jsx code word getranslate naar javascript zodat de brower het kan lezen. Hier word de snake parts ingeladen en laten zien. Het neem de cordinaten en zet het in de juist positie
          //takes snake dots position as props and then render them.
        )
      })}
    </div>
  )
}