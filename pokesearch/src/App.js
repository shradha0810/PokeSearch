import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokName, setpokName] = useState("");
  const [pokChosen, setPokChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: pokName,
    type: "",
    weight: "",
    front_image: "",
    back_image: "",
    speed: "",
    hp: "",
    attack: "",
    defense: "",
  });
  
  const searchPok = () => {
    if(pokName===""){
      alert("Pokemon named required");
      return;
    }
    else{
      Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokName}`).then(
      (response) => {
        setPokemon({
          name: pokName,
          type: response.data.types[0].type.name,
          weight: response.data.weight,
          front_image: response.data.sprites.front_default,
          back_image: response.data.sprites.back_default,
          speed: response.data.stats[5].base_stat,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
        });
        setPokChosen(true);
      }
    );
    }
    
  };
  
  return (
    <>
      <div className="Head">
        <div className="title">PokeSearch</div>
        <input
          className="SearchBox"
          type="text"
          placeholder="Pokemon Name"
          onChange={(event) => {
            setpokName(event.target.value);
          }}
        ></input>
        <button onClick={searchPok} className="SearchButton">
          Search
        </button>
        <div className="Message"><p>Kindly use lower casing while entering the pokemon name</p></div>
      </div>
      <div className="display">
        {pokChosen ? (
          <div className="chosenDisplay">
            <div className="displayText">
              <h1>{pokemon.name}</h1>
              <div className="displayPicture">
                <img
                  src={pokemon.front_image}
                  alt="Nothing Found"
                  width="150px"
                  height="150px"
                ></img>
                <img
                  src={pokemon.back_image}
                  alt="Nothing Found"
                  width="150px"
                  height="150px"
                ></img>
              </div>

              <p>
                Type:{pokemon.type}
                <br />
                Weight:{pokemon.weight}
                <br />
                Speed:{pokemon.speed}
                <br />
                HP:{pokemon.hp}
                <br />
                Attack:{pokemon.attack}
                <br />
                Defense:{pokemon.defense}
              </p>
            </div>
          </div>
        ) : (
          <h3 className="NotChosenDisplay">Choose Your Pokemon</h3>
        )}
      </div>
    </>
  );
}

export default App;
