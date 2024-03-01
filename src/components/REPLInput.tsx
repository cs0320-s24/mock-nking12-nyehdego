import { arrayBuffer } from 'node:stream/consumers';
import { Dispatch, SetStateAction, useState } from 'react';
import '../styles/main.css';
import { ControlledInput } from './ControlledInput';
import { commands, REPLFunction } from './REPLFunction';

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: JSX.Element[];
  setHistory: Dispatch<SetStateAction<JSX.Element[]>>;
  isBrief: boolean;
  setIsBrief: Dispatch<SetStateAction<boolean>>;
}



// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props : REPLInputProps) {
    // Remember: let React manage state in your webapp. 
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');
    // TODO WITH TA : add a count state
    const [count, setCount] = useState<number>(0)

      

  // this function handles the output depending on whether the mod eis verbose or brief
    function handleCommands(command : string, args: Array<string>, func: REPLFunction) {
      if (props.isBrief) {
        const output = func(args, props.isBrief, props.setIsBrief);
        if (typeof output === "string") {
          props.history.push(output);
          console.log(props.history)
        } else {
          // for (let i = 0; i < output.length; i++) {
          //     props.history.push("[" + output[i].toString() + "]");
          //     console.log(props.history)
          // }
          props.history.push(output)
        }
      } else {
        props.history.push(<p>{"Command: " + command}</p>);
        const output = func(args,props.isBrief, props.setIsBrief);
        if (typeof output === "string") {
          props.history.push(<p>{"Output: " + output}</p>);
          console.log(props.history)
        } else {
          props.history.push(<p>Output: </p>);
          // for (let i = 0; i < output.length; i++) {
          //   props.history.push(<p>{"[" + output[i].toString() + "]"}</p>);
          //   console.log(props.history)
          props.history.push(output)
          }
        
      }

      console.log(props.history)
      props.setHistory([...props.history]);
      setCommandString("");
    }
      
    
    // This function is triggered when the button is clicked, and calls on the handlecommands to parse the text 
    function handleSubmit(commandString:string) {
      setCount(count + 1);
      const commandArr: string[] = commandString.split(" ");
      const command: string = commandArr[0]
      const args = commandArr.slice(1)
      const functionToUse = commands[command]
      if (typeof functionToUse != 'function'){
        props.setHistory([...props.history, <p>Error: command not recognized</p>]);
      } else{
      handleCommands(command, args, functionToUse)}
      setCommandString("");
    }
    /**
     * We suggest breaking down this component into smaller components, think about the individual pieces 
     * of the REPL and how they connect to each other...
     */
    return (
        <div className="repl-input">
            {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
            {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
            <fieldset>
              <legend>Enter a command:</legend>
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
            <button onClick={() => handleSubmit(commandString)}>Submitted {count} times</button>
        </div>
    );
  }