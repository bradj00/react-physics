import React from 'react'
import {getEllipsisTxt} from "../helpers/formatters";
const Styles={
    thisDiv:{
        width:'55%',
        height:'85%',
        // backgroundColor:'#666',
        margin:'10px',
        marginLeft:'20%',
        display:'flex',
        justifyContent:'center',
        fontSize:'8px',
    }
}

const trophyDiv = ({trophyInfo}) => {
  console.log(trophyInfo);
  return (
    <div style={Styles.thisDiv}>
        <div > 
            <a href={trophyInfo.token_uri}  target="blank"> 
                <img height={150} width={300} src={trophyInfo.token_uri}> 
                </img>
            </a>
            <div style={{fontFamily:'Times New Roman', fontSize:'20px'}}>Owner: <span style={{color:'#00ff00'}}>{getEllipsisTxt(trophyInfo.owner_of, 5)}</span></div>
            <div style={{fontFamily:'Times New Roman', fontSize:'20px'}}>DB Sync At: <span style={{color:'#00ff00', fontSize:'14px'}}> {trophyInfo.synced_at} </span> </div>
        </div>
        
        {/* <div >{trophyInfo.token_address}</div> */}
    </div>
  )
}

export default trophyDiv