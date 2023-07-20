import { FC, useState } from "react";
import { IGame } from "../../types/game";
import "./gameCard.css"

interface GameCardProps { 
  game: IGame
}

export const GameCard: FC<GameCardProps> = ({game}) =>{
  //const year = props.game.timeCreated.getFullYear()
  const [isDiscount, setDiscount] = useState<boolean>(true)

  return(
    <div className="gameCard">
      <img src={game.previewImage} alt="Card img"/>
      <div className="gameCard-description">
        <div className="gameCard-title">
          {game.title}
        </div>
        <div className="gameCard-author">
          {game.author}
        </div>        
        <div className="gameCard-price">
          <div className="gameCard-discount">-10%</div>
          <div className="gameCard-Prices">
            <div className="gameCard-oldPrice" style={ isDiscount ? {display:"block"} : {display:"none"}}>
              ${game.price}
            </div>
            <div className="gameCard-actualPrice">
              ${(game.price - (game.price * .1)).toFixed(2)}
            </div>        
          </div>
        </div>
        <input type="hidden" name="productId" value={game.id}/>
        <button className="gameCard-btn" type="submit">To Cart</button>
      </div>
    </div>
  )
}