import React, { Fragment } from "react";

export default function GameOver(props) {
  return props.show ? (
    <div id="gameOver">
      <div>Parabéns, você completou o jogo!</div>
      <button id="restart" onClick={props.handleRestart}>
        Restart
        {/* Tente Novamente com um tempo melhor e com menos movimento!!! */}
      </button>
    </div>
  ) : (
    <Fragment />
  );
}
