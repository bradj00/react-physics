import logo from './logo.svg';
import './App.css';
import BasicPhysics from "./components/basicPhysics";
import PlayerBar from "./components/PlayerBar";
import PlayerScore from './components/PlayerScore';
import TopScores from './components/TopScores';

const Styles = {
  window:{
    position:'absolute',
    width:'100%',
    height:'100%',
    backgroundColor:'#111',
  },
  container: {
    position:'absolute',
    top:'14%',
    height:'85%',
    width:'99%',
    backgroundColor:'#888',
    color:'#fff',
    display:'flex',
    marginLeft:'10px',
    cursor:'none',
    
  },
  gameTitle:{
    color:"#fff",
    display:'flex',
    justifyContent:'center',
    fontSize:'30px',
    position:'absolute',
    top:'2%',
    left:'38%',
  },
  playerBar:{
    color:"#fff",
    display:'flex',
    justifyContent:'center',
    fontSize:'15px',
    position:'absolute',
    top:'9%',
    left:'43%',
  },
  playerScore:{
    color:"#fff",
    display:'flex',
    justifyContent:'center',
    fontSize:'15px',
    position:'absolute',
    top:'2%',
    left:'2%',
  },
  topScores:{
    color:"#fff",
    display:'flex',
    justifyContent:'center',
    fontSize:'15px',
    position:'absolute',
    top:'2%',
    right:'2%',
  }

}

function App() {
  return (
    <>

    <div style={Styles.window}>
      <div style={Styles.gameTitle}>
        BRICK BREAK 2022
      </div>
      <div style={Styles.playerScore}>
        <PlayerScore />
      </div>
      <div style={Styles.playerBar}>
        <PlayerBar />
      </div>
      <div style={Styles.topScores}>
        <TopScores />
      </div>

      <div style={Styles.container}>
        <BasicPhysics />
      </div>
    </div>

    </>
  );
}

export default App;
