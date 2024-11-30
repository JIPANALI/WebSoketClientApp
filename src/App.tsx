import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //here type also present it will be null or it can be websoket type
  const [socket, setSocket] = useState<WebSocket | null>(null);//here create a state variable of soket name, initialize with null
  const [latestmessage,setLatestMessage]=useState("")
  const [inputdata,setInputData]=useState("")
  useEffect(() => {
    //here why you did not WebSoket import ??==> bcz it is natively present in browser so you do not need to import//like fetch you dont have to import 
    const newSocket = new WebSocket('ws://localhost:8080');//connect to websoket server using this url like we did in postwoman
    newSocket.onopen = () => {//when you connection is completed then in this section will come.
      console.log('Connection established');
      newSocket.send('Hello Server!'); //sending  the data to server
    }
    newSocket.onmessage = (message) => {//when the server will response this section will come here
      console.log('Message received:', message.data);
      setLatestMessage(message.data)
    }
    setSocket(newSocket);//set to connection is established so user cant 
    return () => newSocket.close();//better it is close //unmount
  }, [])

  if(!socket){ //untill soket is connect it will return the loading component
    return<div>Loading</div>
  }
  return (
    <>
    <input onChange={(e)=>{
      setInputData(e.target.value)
    }}></input>
      <button onClick={()=>{
         socket.send(inputdata)//send to soket server through the input to soket server
      }}>send</button>
      <div>{latestmessage}</div>{/*get the value from soket server then print it  */}
    </>
  )
}

export default App