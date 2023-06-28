import React, {useState, useRef, useEffect} from "react";
import '../styles/SimonGame.css'

import GameBtn from "./GameBtn";

const colors = ["green", "red", "yellow", "blue"]


function SimonGame() {

    //states 
    const [sequence, setSequence] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [playingIndex, setPlayingIndex] = useState(0);

    //Refs
    const greenRef = useRef(null);
    const redRef = useRef(null);
    const yellowRef = useRef(null);
    const blueRef = useRef(null);

    //Functions 

    const resetGame = () => {
        setSequence([]);
        setPlaying(false);
        setPlayingIndex(0);
    }

    const addNewColor = () => {
        const color = colors[Math.floor(Math.random() * 4)];
        const newSequence = [...sequence, color];
        setSequence(newSequence);
    };

    const handleNextLevel = () => {
        if (!playing) {
            setPlaying(true);
            addNewColor();
            console.log("click")
        }
    };

    const handleColorClick = (e) => {
        if(playing) {
            e.target.classList.add("opacity");

            setTimeout(()=>{
                e.target.classList.remove("opacity");
                
                const clickColor = e.target.getAttribute("color");

        //clicked the correct color of the sequence
                if(sequence[playingIndex] === clickColor){
            //clicked the last color of the sequence
                    if(playingIndex === sequence.lenght -1){
                        setTimeout(() => {
                            setPlayingIndex(0);
                            addNewColor();
                        }, 250);
                    } else {
                //missing some colors of the sequence to be clicked
                        setPlayingIndex(playingIndex +1);
                    }
                } else {
                    resetGame()
                }
            },250)
        }
    }

    // useEffect
    useEffect(()=> {
        //show sequence
      if(sequence.length > 0){  
        const showSequence = (index = 0) => {
            
            let ref = null;

            switch (sequence[index]) {
                case "green":
                    ref = greenRef;
                    break;
                case "red": 
                    ref = redRef;
                    break;
                case "yellow": 
                    ref = yellowRef;
                    break;
                case "blue": 
                    ref = blueRef;
                    break;
                default: 
                break;
            };

                setTimeout(()=> {
                    ref.current.classList.add("brightness")

                    setTimeout(()=> {
                        ref.current.classList.remove("brightness")
                        if (index < sequence.length -1) showSequence(index +1);
                    }, 250);
                }, 250);
        };

        showSequence()  
      };
    }, [sequence]);


    return (
        //Main container
        <div className="main-container">
            {/* Game container */}
            <div className="game-container">
                {/* Green and red container */}
                <div>
                    {/* Green button */}
                    <GameBtn className="green-button" 
                    color="green"
                    ref={greenRef}
                    onClick={handleColorClick}
                    />

                    {/* Red button */}
                    <GameBtn className="red-button" 
                    color="red"
                    ref={redRef}
                    onClick={handleColorClick}
                    />
                </div>

                {/* Yellow and blue container */}
                <div>
                    {/* Yellow button */}
                    <GameBtn className="yellow-button"
                    color="yellow"
                    ref={yellowRef}
                    onClick={handleColorClick}
                    />

                    {/* Blue button */}
                    <GameBtn className="blue-button"
                    color="blue" 
                    ref={blueRef}
                    onClick={handleColorClick}
                    />
                </div>

                <button className="play-button" 
                onClick={handleNextLevel}>{sequence.length === 0 ? "Play" : sequence.length} </button>
            </div>
        </div>
    )
}

export default SimonGame

