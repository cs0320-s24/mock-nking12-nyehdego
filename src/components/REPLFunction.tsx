import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
//import "../src/mockedJson.ts"
import { mocked_data_1, mocked_data_2, mocked_data_3, mocked_data_4, mocked_data_5, mocked_malformed } from "../mockedJson";


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


// Map containg all of our mocked data
let loadedFile: string[][] = [];
let loadedFileName : string;
let isLoaded: boolean = false;
const dataMap: { [index: string]: string[][] } = {
    mocked_data_1: mocked_data_1,
    mocked_data_2: mocked_data_2,
    mocked_data_3: mocked_data_3,
    mocked_data_4: mocked_data_4,
    mocked_data_5: mocked_data_5,
    mocked_malformed: mocked_malformed,
};

// mocked data query map for our "mocked" calls to search command
const queryMap: { [key: string]: { [key: string]: string | string[][] } } = {
  mocked_data_1: { "0 1": [["1", "2", "3", "4", "5"]], "4 11": [[]] },
  mocked_data_2: {
    "0 Hello": [["Hello", "Tim", "Bye"]],
    "2 Blue": [["Red", "Yellow", "Blue"]],
    "4 Hi": "No matches",
  },
  mocked_data_3: { "0 Hello": [[]] },
  mocked_data_4: {
    "Orange 1": [
      ["Red", "Orange", "Yellow"],
      ["Green", "Orange", "Red"],
    ],
    "Orange 3": "No matches",
  },
  mocked_data_5: {
    "StarID 0": [["0", "Sol", "0", "0", "0"]],
    "Orange 3": [[]],
    "1 282.43485": [["1", "282.43485", "0.00449", "5.36884"]],
    "1 ProperName": [["1", "282.43485", "0.00449", "5.36884"]],
  },
};

// strategy pattern: any developer can add commands to this command map and have corresponding functions to build on the capabilities of the program
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

// function that handles load command
function handleLoad(args: Array<string>) : string | string[][]{
    const filepath = args[0]
    loadedFile = dataMap[args[0]]
    if (dataMap[filepath] === mocked_malformed){
        return "Malformed csv. Try a different one."
    }
    if (dataMap[filepath]) {
        isLoaded = true;
        loadedFileName = args[0];
        return `${filepath} successfully loaded`;
    } else {
        return `ERROR: ${filepath} is not valid. Try again.`;
    }
}

// function that handles view command
function handleView(args: Array<string>) : string | string[][]{
    if (!isLoaded){
        return "Error: No CSV loaded";
    } else {
        return loadedFile;
    }
}

/**
 * function that handles search command, taking in arguments for a potential column name or index for more narrowed search
 * 
 * for this search to work with mocked data, we have it query through our queryMap for ease
 */

function handleSearch(args: Array<string>) : string | string[][] {
    if (!isLoaded){
        return "Error: No CSV loaded";}
    if (args.length < 2){
        return "Error: incorrect search parameters. Proper usage: 'search <column> <value>'";
    }
    else {
    const col = args[0]
    const value = args[1]
    const query : string = col + " " + value
    if (queryMap[loadedFileName][query]) {
      return queryMap[loadedFileName][query];
    } else {
      return "Error: unrecognized query"
    }
}
}


/**
 * function that handles mode command, taking in the global ifBrief variable to mark whether we are in verbose or brief
 * 
 */
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