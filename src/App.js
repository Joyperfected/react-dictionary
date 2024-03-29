import { React, useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function App (){
  //setting up the initail state using react hook 'use state'

  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");

 //fucntion to fetch information on button
 //click, set the data accordingly

  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    ).then((response) => {
      setData(response.data[0]);
    });
  }

  //function to play and listen the phonetics of the searched 

  function playAudio() {
    console.log(data.phonetics)
    let audioSelect = data.phonetics[0].audio;
    if (audioSelect === ""){
      audioSelect = data.phonetics[1].audio
    }

    let audio = new Audio(audioSelect);
    audio.play();
  }

      return(
        <div className="App">
            <div className="p-5">
              <div className="">
                <div className="">
                <h1>Free Dictionary</h1>
               <div className="searchBox">
  
                  {/* Taking user input */}
                  <input
                    type="text"
                    className="w-75"
                    placeholder="Search..."
                    onChange={(e) => {
                      setSearchWord(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      getMeaning();
                    }}
                  >
                    <FaSearch size="20px" />
                  </button>
               </div>
          {data && (
              <div className="showResults">
                      <h2>
                        {data.word}{" "}
                        <button
                          onClick={() => {
                            playAudio();
                          }}
                        >
                          <FcSpeaker size="26px" />
                        </button>
                      </h2>
                      <h4>Parts of speech:</h4>
        
                  
                  <p>{data.meanings[0].partOfSpeech}</p>
        
        
                  <h4>Definition:</h4>
        
                  
                  <p>{data.meanings[0].definitions[0].definition}</p>
        
        
                  <h4>Example:</h4>
        
                  
                  <p>{data.meanings[0].definitions[0].example}</p>
 
                </div>
            )}
                </div>
              </div>
            </div>
        </div>
  
      );


}
export default App;

