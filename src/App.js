import logo from './logo.svg';
import './App.css';
import BasicPhysics from "./components/basicPhysics.jsx";

const Styles = {
  container: {
    position:'absolute',
    height:'99%',
    width:'99%',
    backgroundColor:'#333',
    color:'#fff',
    display:'flex',
    marginLeft:'10px',
    marginTop:'5px',
    cursor:'none',
  }

}

function App() {
  return (
    <div style={Styles.container}>
      <BasicPhysics />
    </div>
  );
}

export default App;
