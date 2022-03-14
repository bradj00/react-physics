import React, {useContext} from 'react'
import { useEffect } from 'react';
import {PlayerInfo} from '../App.js';


const PlayerScore = () => {
  const {playerCurrentScore}     = useContext(PlayerInfo);
  const {setPlayerCurrentScore}  = useContext(PlayerInfo);
  
  const {thePlayerCurrentScore}   = useContext(PlayerInfo);


  return (

    <div>
        SCORE: <br></br> <br></br> <span style={{fontSize:'25px', color:'#99ff00'}}>{playerCurrentScore}</span>
    </div>

  )
}

export default PlayerScore