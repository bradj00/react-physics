import React, { useState, useEffect } from 'react'
import { useNFTBalances, useWeb3ExecuteFunction, useMoralis, useMoralisFile} from 'react-moralis';
import {contractAddress, contractAbi} from '../contracts/contractInfo.js';


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
    border:'1px solid #00ff00',
    top:'15%',
    
  }
  
}

const TrophyRoom = () => { 
  const {enableWeb3, web3, isWeb3Enabled} = useMoralis();
  // const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
  const getUserNFTBalances = useNFTBalances();
  
  const  [maxNftId, setMaxNftId] = useState(0);
  const [trophyArray, setTrophyArray] = useState([]);
  

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

      getUserNFTBalances.getNFTBalances({
        onSuccess: (data) => {
          console.log('user balances! ', data.result);
        },
        onError: (error) => {
          console.log('error: ', error);
        }
      }); // Moralis call to database
    },200);
  // }

  },[]);

  useEffect(()=>{
    console.log('maxNftId is now: ', maxNftId);

    //get trophy list and push to array
  },[maxNftId]);

  
  return (
    <div style={Styles.container}>
        <span style={{position:'absolute',top:'5%',fontSize:'20px',}}>Trophy Room!</span>
        <div style={Styles.trophyList}>
          Trophies
        </div>
    </div>
  )
}

export default TrophyRoom