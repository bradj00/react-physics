import logo from './logo.svg';
import './App.css';
import BasicPhysics from "./components/basicPhysics.jsx";

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
    
  }

}

function App() {
  return (
    <div style={Styles.window}>
      <div style={Styles.container}>
        <BasicPhysics />
      </div>
    </div>
  );
}

export default App;
