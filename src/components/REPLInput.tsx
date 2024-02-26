import { arrayBuffer } from 'node:stream/consumers';
import { Dispatch, SetStateAction, useState } from 'react';
import '../styles/main.css';
import { ControlledInput } from './ControlledInput';
import { commands, REPLFunction } from './REPLFunction';

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
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

        function modeName(): string {
          if (props.isBrief == true) {
            return "brief";
          } else {
            return "verbose";
          }
        }

    // function handleMode(command: string, output: string[]) {
    //   if (props.isBrief) {
    //     props.setHistory([...props.history, output]);
    //   } else {
    //     props.setHistory([
    //       ...props.history,
    //       "Command: " + command, "Output: " + output,
    //     ]);
    //   }
    //   setCommandString("");
    // }

    function handleMode(args: Array<string>, func: REPLFunction) {
      if (props.isBrief) {
        const output = func(args);
        if (typeof output === 'string') {
          props.setHistory([...props.history, output]);}
        else {
          for (let i = 0; i < output.length; i++){
            for (let j = 0; j < output[i].length; j++)
            props.setHistory([...props.history, output[i][j]]);
          }
        }
      } else {
        props.setHistory([
          ...props.history,
          "Command: " + command, "Output: " + output,
        ]);
      }
      setCommandString("");
    }
      
    
    // This function is triggered when the button is clicked.
    function handleSubmit(commandString:string) {
      setCount(count + 1);
      const commandArr: string[] = commandString.split(" ");
      const command: string = commandArr[0]
      console.log(commandArr)
      if (command == 'mode'){
        props.setIsBrief(!props.isBrief);
        props.setHistory([...props.history, "mode changed to " + modeName()]);
        return;
      } else {
      const functionToUse = commands[command]
      handleMode(commandArr, functionToUse) //this is broken but I will fix when we implement more commands
      setCommandString("");
      }
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