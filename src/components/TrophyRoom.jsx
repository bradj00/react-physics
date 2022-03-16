import React, { useState, useEffect, useContext } from 'react'
import { useNFTBalances, useWeb3ExecuteFunction, useMoralis, useMoralisFile} from 'react-moralis';
import {contractAddress, contractAbi} from '../contracts/contractInfo.js';
import {PlayerInfo, cursorStyle} from '../App.js';
import TrophyDiv from './trophyDiv';

const Styles = {
  container: {
    display:'flex',
    justifyContent:'center',
    backgroundColor: '#000',
    position:'absolute',
    width:'100%',
    height:'100%',
  },
  trophyList:{
    position:'absolute',
    width:'85%',
    height:'70%',
    border:'0px solid #00ff00',
    top:'15%',
    display:'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    
  }
  
}

const TrophyRoom = () => { 
  const {cursorStyle, setCursorStyle} = useContext(PlayerInfo);
  const {enableWeb3, web3, isWeb3Enabled} = useMoralis();
  // const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
  const getUserNFTBalances = useNFTBalances();
  
  const  [maxNftId, setMaxNftId] = useState(0);
  const [trophyArray, setTrophyArray] = useState([]);
  const [userNftArray, setUserNftArray] = useState([]);
  

  // { data, error, fetch, isFetching, isLoading }
  const getMaxNftId = useWeb3ExecuteFunction({ 
    chain:'mumbai',
    abi: contractAbi,
    contractAddress: contractAddress,
    functionName: "getMaxId",
  });


  useEffect(()=>{
    console.log('enabling web3...');
    enableWeb3();

    // if (isWeb3Enabled){
    setTimeout(function(){  //use isWeb3Enabled instead when moralis team fixes bug
      getMaxNftId.fetch({   // Web3 call straight to node
        onSuccess: (data) => {
          console.log('max ID: ',parseInt(data._value._hex, 16) );
          setMaxNftId(parseInt(data._value._hex, 16) );
        },
        onError: (error) => {
          console.log('big error: ',error);
        }
      });

      
    },200);
  // }
    setCursorStyle('default');
  },[]);

  useEffect(()=>{
    // console.log('maxNftId is now: ', maxNftId);

    //get trophy list and push to array
  },[maxNftId]);

  useEffect(() => {
    console.log('userNftArray ', userNftArray);
  }, [userNftArray]);

  function getNfts(){
    getUserNFTBalances.getNFTBalances({
      onSuccess: (data) => {
        console.log('user balances! ', data.result);
        setUserNftArray(data.result);
      },
      onError: (error) => {
        console.log('error: ', error);
      }
    }); // Moralis call to database
  }
  
  return (
    <div style={Styles.container}>
        <span style={{position:'absolute',top:'5%',fontSize:'20px',}}>
          Trophy Room!<br></br><br></br>
          <button onClick={()=>{getNfts()}}>Get Trophies from Database</button>
        </span>
        <div style={Styles.trophyList}>
          
          {
            userNftArray.map((entry, index)=>{
              return(<div key={index}><TrophyDiv trophyInfo={entry} /> </div>)
              
            })
          }
        </div>
    </div>
  )
}

export default TrophyRoom