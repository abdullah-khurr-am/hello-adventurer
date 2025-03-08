import { useEffect, useState } from 'react';
import AdventureBody from './components/AdventureBody'
import './App.css'
import './components/styling.scss'
import AdventureInput from './components/AdventureInput';
import axios from 'axios';

export interface AdventureBodyProps {
  adventureHistory: AdventureHistory[];
}

export interface AdventureHistory {
  role: string;
  content: string;
}

const BASE_URL: string = 'https://hello-adventurer-server-8473a86cda01.herokuapp.com';
function App() {
  const [adventureHistory, setAdventureHistory] = useState<AdventureHistory[]>([]);
  const [adventureInput, setAdventureInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [shouldSendChoice, setShouldSendChoice] = useState(false);

  useEffect(() => {
    let isMounted = true;
    bootStrapAdventure().then(() => {
      if (isMounted) setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (shouldSendChoice && adventureInput !== '') {
      sendUserChoice();
      setShouldSendChoice(false);
    }
  }, [shouldSendChoice, adventureInput]);

  const bootStrapAdventure = async () => {
    await axios.post(`${BASE_URL}/start_adventure`, null, {
      headers: {
        authorization: import.meta.env.VITE_ADVENTURER_AUTH_KEY as string
      }
    }).then((response) => {
      setLoading(false);
      const adventureStart: AdventureHistory = { role: 'Assistant', content: response.data };
      setAdventureHistory([adventureStart]);
    });
  };

  const setUserAdventureInput = (input: string) => {
    const userChoice: AdventureHistory = {
      role: 'User',
      content: input
    }

    setAdventureHistory([...adventureHistory, userChoice]);
    setAdventureInput(input);
    setShouldSendChoice(true);
  }

  const sendUserChoice = async () => {
    if (adventureInput === '') return;
    setLoading(true);
    await axios.post(`${BASE_URL}/adventure_choice`, { choice: adventureInput }, {
      headers: {
        authorization: import.meta.env.VITE_ADVENTURER_AUTH_KEY as string
      }
    }).then((response) => {
      setLoading(false);
      setAdventureHistory(response.data);
    });
  };


  return (
    <div className='adventure'>
      <AdventureBody adventureHistory={adventureHistory} loading={loading} />
      <AdventureInput setAdventureInput={setUserAdventureInput}/>
        </div>
  )
}

export default App
