import React from 'react'
import {useMoralis} from 'react-moralis';
import {getEllipsisTxt} from "../helpers/formatters";
const PlayerBar = () => {

  const { logout, authenticate, isAuthenticated, user } = useMoralis();

  if (!isAuthenticated){
    return(
      <div style={{marginLeft:'2em', display:'flex', position:'absolute', top:'-1em', right:'-10em'}}>
        <button onClick={()=>{authenticate()}}>Sign-In with MetaMask</button>
      </div>
    )
  }else {
    console.log(user);
    return (
      <div>
        <div>
            Player <span style={{color:'#99ff00'}}>{getEllipsisTxt(user.attributes.ethAddress, 4)}</span>
        </div>

        <div style={{position:'absolute',right:'-30%',top:'-40%'}}>
          <button onClick={()=>{logout()}}>Sign-Out</button>
        </div>
      </div>
    )
  }
  }

export default PlayerBar