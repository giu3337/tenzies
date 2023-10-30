import React, { useState , useEffect} from "react";
import Dice from "./Dice";
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"


const Main = () => {

  

    const [getNumber, setGetNumber] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHeld = getNumber.every(die => die.isHeld)
        const firstValue = getNumber[0].value
        const allSameValue = getNumber.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            
        }
      }, [getNumber])



    function generateNewDie() {
        return {
            value: Math.floor(Math.random() * 6)+1,
            isHeld: false, 
            id: nanoid(),
           
        }
    }


    function allNewDice() {
        const diceArray = []
        for (let i = 0; i < 10; i++) {
            
           
            diceArray.push(
                generateNewDie()
            )
            
        }
    
        return diceArray
    
    }

 

    function holdDice(id) {
        setGetNumber(oldDice => oldDice.map(dice => {
            return dice.id == id ?
             {...dice, isHeld: !dice.isHeld} :
             dice
            }))
      
    }

    const getRandomDice = getNumber.map(dice => {
        return <Dice 
            value={dice.value} 
            key={dice.id} 
            isHeld={dice.isHeld} 
            holdDice={() => holdDice(dice.id)}
            />
     })

     function renderNewDice() {
        if(!tenzies) {
            setGetNumber(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setGetNumber(allNewDice())
        }
    }

  return (
  
    <main className="w-full h-screen bg-[#2B283A] flex justify-center items-center">
      <div className="w-5/6 bg-[#F5F5F5] h-3/6 max-w-sm rounded-xl flex flex-col items-center justify-around">
      {tenzies && <Confetti />}
        <div className="text-center ">
            <h1 className="text-2xl font-bold tracking-wide">Tenzies</h1>
            <p className="pt-1 text-[#4A4E74] text-base">Roll until all dice are the same. Click <br />  each die to freeze it at its current value  <br /> between rolls.</p>
        </div>

        <div className="w-4/5 grid grid-cols-5 gap-4 ">
            {getRandomDice}
        </div>

        <button 
            onClick={renderNewDice}
            className="bg-[#5035FF] text-white text-bold py-2 px-8 rounded-md tracking-wide
            cursor-pointer active:shadow-2xl hover:bg-sky-300
            ">{tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
};

export default Main;
