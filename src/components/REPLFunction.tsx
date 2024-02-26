import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";


/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when 
 * the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {    
    (args: Array<string>): string|string[][]
} 

export const commands: { [key: string]: REPLFunction} = {
//   mode: (args: string[]) => handleMode(args),
};


// function handleMode(args: Array<string>): String | String[][] {
//     return 'Mode Changed!';
// }