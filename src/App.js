
import { useReducer } from 'react';
import './App.css';
import  ButtonDigit  from "./ButtonDigit";
import  OperationButton  from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

// function reducer(state , action){
function reducer(state  , {type, payload }){
switch(type){
  case ACTIONS.ADD_DIGIT:
    if(payload.digit === "0" && state.currentOperand ==="0"){
      return state
    }

    if(payload.digit === "." && state.currentOperand.includes(".")){
      return state
    }

    return{
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.digit}`
    }

    case ACTIONS.DELETE_DIGIT:
      if(state.currentOperand == null) return state
      if(state.currentOperand.length === 1) return {
        ...state,
        currentOperand: null
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }

    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.EVALUATE:
      if(state.operation == null || state.currentOperand == null || state.previous == null){
        return state
      }
      return{
        ...state,
        currentOperand: evaluate(state),
        previous: null,
        operation: null
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previous == null){
        return state
      }
      if(state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation,
        }
      }
      if(state.previous == null){
        return {
          ...state,
          operation: payload.operation,
          previous: state.currentOperand,
          currentOperand: null
        }
      }


      return{
        ...state,
          operation: payload.operation,
          previous: evaluate(state),
          currentOperand: null  
      }
  }//switch closed
}//reducer closed

function evaluate({currentOperand, previous, operation}){
  const prev = parseFloat(previous)
  const curr = parseFloat(currentOperand)

  if(isNaN(prev) || isNaN(curr)) return ""
  let compute = ""

  switch(operation){
    case "+":
      compute = prev + curr
      break
     
    case "-":
      compute = prev - curr
      break
     
    case "*":
      compute = prev * curr
      break
     
    case "/":
      compute = prev / curr
      break
     
  }
  return compute.toString()
}

const INT_MAX = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
})

function formatOprand (operand){
if (operand ==null) return 
const [integer , decimal] = operand.split(".")
if(decimal == null) return INT_MAX.format(integer)
}
function App() {

  // const [ state , dispatch] = useReducer(reducer)

  const [ { currentOperand , previous, operation } , dispatch] = useReducer(
    reducer,{})

  // dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit: 1}})
  return (
    <>
    <div className="container">
      <div className="output">
        <div className="previous">{formatOprand(previous)} {operation}</div>
        <div className="current">{formatOprand(currentOperand)}</div>
      </div>
      <button className='span-two' onClick={()=>dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="/" dispatch={dispatch}/>
      {/* <ButtonDigit digit="/" dispatch={dispatch}/> */}
      <ButtonDigit digit="1" dispatch={dispatch}/>
      <ButtonDigit digit="2" dispatch={dispatch}/>
      <ButtonDigit digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
      <ButtonDigit digit="4" dispatch={dispatch}/>
      <ButtonDigit digit="5" dispatch={dispatch}/>
      <ButtonDigit digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <ButtonDigit digit="7" dispatch={dispatch}/>
      <ButtonDigit digit="8" dispatch={dispatch}/>
      <ButtonDigit digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <ButtonDigit digit="." dispatch={dispatch}/>
      <ButtonDigit digit="0" dispatch={dispatch}/>
      <button className='span-two' onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
      
    </div>
    </>
  );
}

export default App;
