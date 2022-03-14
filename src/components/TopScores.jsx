import React from 'react'
const Styles = {
    player:{
        color:'#99ff00',
        fontSize:'20px',
    },
    score:{
        float:'right',
        color:'#ff9900',
        marginLeft:'20px',
        fontSize:'20px',
    }
}

const TopScores = () => {
  return (
    <div>
        <div>
            Top Scores:
        </div><br></br>
        <div>1. <span style={Styles.player}>0x000...000</span>  <span style={Styles.score}>14,600</span></div>
        <div>2. <span style={Styles.player}>0x000...000</span>  <span style={Styles.score}>10,150</span></div>
        <div>3. <span style={Styles.player}>0x000...000</span>  <span style={Styles.score}>8,200</span></div>

    </div>
  )
}

export default TopScores