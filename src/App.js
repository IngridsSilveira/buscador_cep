import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  const handleSearch = async () => {
    if (input === "") {
      alert("Preencha com seu cep");
      return;
    }
    try {
      await fetch(`https://viacep.com.br/ws/${input}/json`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setCep(res);
          setInput("");
        });
    } catch {
      alert("Ops, erro a buscar");
      setInput("");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
      <footer>
        <p>Feito por <a href="https://ingriddev.netlify.app/">Ingrid de Souza</a></p>
      </footer>
    </div>
  );
}
