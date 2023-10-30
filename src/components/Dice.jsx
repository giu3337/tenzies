import React from 'react'

const Dice = (props) => {

   

    const { value, isHeld, holdDice} = props

 const styles = {
    backgroundColor: isHeld ? "#59E391" : "white"
 }


  return (
    <>
        <div 
            className="h-10 w-10 ronded-lg shadow-md flex justify-center items-center font-bold text-lg cursor-pointer"
            style={styles}
            onClick={holdDice}
            
            >
            
            <span>{value}</span>
        </div>
    </>
  )
}

export default Dice