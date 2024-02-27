import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
//import "../src/mockedJson.ts"
import { mocked_data_1, mocked_data_2, mocked_data_3, mocked_data_4, mocked_data_5 } from "../mockedJson";


/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when 
 * the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT* contain the command-name prefix.
 */

export interface REPLFunction {    
    (args: Array<string>, isBrief: boolean, setIsBrief: Dispatch<SetStateAction<boolean>>): string|string[][]
} 


let loadedFile: string[][] = [];
let isLoaded: boolean = false;
const dataMap: { [index: string]: string[][] } = {
    mocked_data_1: mocked_data_1,
    mocked_data_2: mocked_data_2,
    mocked_data_3: mocked_data_3,
    mocked_data_4: mocked_data_4,
    mocked_data_5: mocked_data_5,
};

export const commands: { [key: string]: REPLFunction } = {
  load_csv: (args: string[]) => handleLoad(args),
  view: (args: string[]) => handleView(args),
  search: (args: string[]) => handleSearch(args),
  mode: (
    args: string[],
    isBrief: boolean,
    setIsBrief: Dispatch<SetStateAction<boolean>>
  ) => handleMode(args, isBrief, setIsBrief),
};

function handleLoad(args: Array<string>) : string | string[][]{
    const filepath = args[1]
    loadedFile = dataMap[args[1]]
    if (dataMap[filepath]) {
        isLoaded = true;
        return `"${filepath}" successfully loaded`;
    } else {
        return `ERROR: "${filepath}" is not valid. Try again.`;
    }
}

function handleView(args: Array<string>) : string | string[][]{
    if (!isLoaded){
        return "Error: No CSV loaded";
    } else {
        return loadedFile;
    }
}

function handleSearch(args: Array<string>) : string | string[][] {}


function handleMode(args: Array<string>, isBrief:boolean, setIsBrief: Dispatch<SetStateAction<boolean>>): string | string[][] {
    function modeName(): string {
      if (isBrief == true) {
        return "verbose";
      } else {
        return "brief";
      }
    }
    setIsBrief(!isBrief);
    return "Mode changed to: " + modeName();
}