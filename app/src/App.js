import Partita from './Partita.js';
import './App.css';
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [partita, setPartita] = useState(false);
  const [response, SetResponse] = useState([]);
  const [nome, setNome] = useState("");
  const [nomeSettato, setNomeSettato] = useState(false);

  function prendiNome(){
    setPartita(true);
    setNomeSettato(false);
  }

  async function iniziaPartita(){
    setNomeSettato(true);
    setLoading(true);
    const result = await fetch("http://localhost:8080/partita", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"nome": nome})
    });

    const nuovoArray = await result.json();
    SetResponse(nuovoArray);
    console.log(nuovoArray);
    setLoading(false);
  }

  return (
    <div>
      <h1>INDOVINA NUMERO</h1>
      <button onClick={prendiNome}>Nuova Partita</button>
      {
        partita ?
        <>
          {
            !nomeSettato ?
              <div>
                <input type="text" onInput={(e) => setNome(e.target.value)}></input>
                <button onClick={iniziaPartita}>invia</button>
              </div>
            :
            loading ?
            <h2>Loading...</h2>
            :
            <Partita key={response.id} response={response} nome={nome}/>
          }
        </>
        :
        ""
      }

    </div>
  );
}

export default App;
