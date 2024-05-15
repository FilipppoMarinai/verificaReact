import { useState } from "react";

export default function Partita({response, nome}){

    const [numero, setNumero] = useState(0);
    const [tentativo, setTentativo] = useState(false);
    const [tentativi, setTentativi] = useState(response.tentativi);
    const [risp, setRisp] = useState([]);

    async function indovina(){
        setTentativo(true);
        const result = await fetch(`http://localhost:8080/partita/${response.id}`, 
        {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"numero": numero})
        });

        const risposta = await result.json();
        setRisp(risposta);
        setTentativi(risposta.tentativi);
        setTentativo(false);
    }

    return(
        <div>
            <h2>Ciao {nome}</h2>
            <h2>ID partita: {response.id}</h2>
            <h2>Tentativi: {tentativi}</h2>

            <h2>Inserisci un numero tra 1 e 100</h2>
            <input type="number" onInput={(e) => setNumero(e.target.value)}></input>
            <button onClick={indovina}>Invia</button>

            {
                tentativo ?
                <h2>Loading...</h2>
                :
                risp.risultato === -1 ?
                <h2>Numero troppo piccolo</h2>
                :
                risp.risultato === 1 ?
                <h2>Numero troppo grande</h2>
                :
                risp.risultato === 0 ?
                <h2>Numero indovinato</h2>
                :
                ""
            }
        </div>
    );
}