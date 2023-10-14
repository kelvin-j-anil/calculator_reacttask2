import React, { useState } from 'react'

import Header from './Components/Header';
import Keypad from './Components/Keypad';

import './App.css';

import moon from './images/moon.png'
import sun from './images/sun.png'

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109 ];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {

  const [isDarkMode,setIsDarkMode] = useState(true);
  const [expression,setExpression] = useState("");
  const [result,setResult] = useState("");
  const [history,setHistory] = useState([]);


  const handleKeyclick = (keyCode,key) =>{
    
    if(!keyCode)return;

    if(!usedKeyCodes.includes(keyCode)) return;
    
    if(numbers.includes(key)){
      if(key==='0'){
        if(expression.length===0)return
        
      }
      calculateResult(expression+key);
      setExpression(expression+key);
    }
      

    else if(operators.includes(key)){
      if(!expression)return

    const lastChar =  expression.slice(-1); 
    if(operators.includes(lastChar))return;
    if(lastChar==='.')return;
    setExpression(expression+key);
    }

    else if(keyCode === 13){
      if(!expression)return;
      calculateResult(expression);

      let  tempHistory = [...history]
      if(tempHistory.length>10 ) tempHistory = tempHistory.splice(0,1);

      tempHistory.push(expression);
      setHistory(tempHistory);
      }
    

    else if(key === '.'){
      if(!expression) return;
      const lastChar = expression.slice(-1);
      if(numbers.includes(lastChar))return;
      setExpression(expression+key)
    }

    else if(keyCode === 8){
      if(!expression)return;
      calculateResult(expression.slice(0,-1));
      setExpression(expression.slice(0,-1));
    }


  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("0");
      return;
    }
  
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);
    const result = eval(exp).toFixed(2) + "";
    setResult(result);
  };



  return (
    <div className="app" 
    tabIndex={0}
    onKeyDown={(event)=>handleKeyclick(event.keyCode,event.key)}
    theme={isDarkMode?"dark":"light"}>
        <div className='app_calculator'>
          <div className='app_calculator_navbar' togg_theme = {isDarkMode?"dark":"light"} >
            <div className='app_calculator_navbar_toggle'onClick={()=> setIsDarkMode(!isDarkMode)} tog_theme = {isDarkMode?"dark":"light"} >
              <div className={`app_calculator_navbar_toggle_circle  ${isDarkMode?"app_calculator_navbar_toggle_circle_active":""}`} >
              <img src={isDarkMode?moon:sun} alt='mode '></img>
              </div>
            
            </div>
          
          </div>
        <Header expression = {expression} result = {result} history = {history}/>
        <Keypad handleKeyclick = {handleKeyclick}/>
      </div>
      
    </div>
  );
}

export default App;
