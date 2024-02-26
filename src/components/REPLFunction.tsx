import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
//import "../src/mockedJson.ts"
import { mocked_data_1, mocked_data_2, mocked_data_3, mocked_data_4 } from "../mockedJson";


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

let loadedFile: string[][] = [];

export const commands: { [key: string]: REPLFunction } = {
  "load_csv": (args: string[]) => handleLoad(args),
  "view": (args: string[]) => handleView(args),

};

function handleLoad(args: Array<string>) : string | string[][]{
    const filepath = args[1]
    const dataMap: { [index: string]: string[][] } = {
        "mocked_data_1": mocked_data_1,
        "mocked_data_2": mocked_data_2,
        "mocked_data_3": mocked_data_3,
        "mocked_data_4": mocked_data_4
    };
    loadedFile = dataMap[args[1]]
    if (dataMap[filepath]) {
        return `"${filepath}" successfully loaded`;
    } else {
        return `ERROR: "${filepath}" is not valid. Try again.`;
    }
}

function handleView(args: Array<string>) : string | string[][]{
    if (loadedFile.length === 0){
        return "Error: No CSV loaded";
    } else {
        return loadedFile;
    }
}



// function handleMode(args: Array<string>): String | String[][] {
//     return 'Mode Changed!';
// }