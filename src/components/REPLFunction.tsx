import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
//import "../src/mockedJson.ts"
import { mocked_data_1, mocked_data_2, mocked_data_3, mocked_data_4, mocked_data_5, mocked_malformed } from "../mockedJson";
import Table from "../components/TableComponent";


/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when 
 * the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT* contain the command-name prefix.
 */

export interface REPLFunction {    
    (args: Array<string>, isBrief: boolean, setIsBrief: Dispatch<SetStateAction<boolean>>): string|string[][]|JSX.Element
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



/**
 * mocked data query map for our "mocked" calls to search command
 */
const queryMap: { [key: string]: { [key: string]: string | string[][] } } = {
  mocked_data_1: { "0 1": [["1", "2", "3", "4", "5"]], "4 11": [[]] },
  mocked_data_2: {
    "0 Hello": [["Hello", "Tim", "Bye"]],
    "2 Blue": [["Red", "Yellow", "Blue"]],
    "4 Hi": [["No matches"]],
  },
  mocked_data_3: { "0 Hello": [[]] },
  mocked_data_4: {
    "Orange 1": [
      ["Red", "Orange", "Yellow"],
      ["Green", "Orange", "Red"],
    ],
    "Orange 3": [["No matches"]],
  },
  mocked_data_5: {
    "StarID 0": [["0", "Sol", "0", "0", "0"]],
    "Orange 3": [[]],
    "1 282.43485": [["1", "282.43485", "0.00449", "5.36884"]],
    "1 ProperName": [["1", "282.43485", "0.00449", "5.36884"]],
  },
};

/**
 * Commands that acts as a map for the commands and directs the program to the correct function to run
 * strategy pattern: any developer can add commands to this command map and have corresponding functions to build on the capabilities of the program
 */
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

/**
 * a function is that loads in the csv into the global 'loadedFile' field. Only one dataset can be loaded at a time
 * @param args an array holding the inputted arguments, namely a filepath, passed in from REPLInput
 * @returns message about whether the load was succesful or not.
 */
function handleLoad(args: Array<string>) : JSX.Element {
    const filepath = args[0]
    loadedFile = dataMap[args[0]]
    if (dataMap[filepath] === mocked_malformed){
        return <p>Malformed csv. Try a different one.</p>
    }
    if (dataMap[filepath]) {
        isLoaded = true;
        loadedFileName = args[0];
        return <p>{filepath} successfully loaded</p>;
    } else {
        return <p>ERROR: ${filepath} is not valid. Try again.</p>;
    }
}

/**
 * a function is that loads iup the data into a table and pastes it into the webpage
 * @returns JSXElement (table)
 */
function handleView(args: Array<string>) : JSX.Element {
  if (!isLoaded) {
      return <p>Error: No CSV loaded</p>;
  } else {
      // Assuming loadedFile is a 2D array of strings
      const output = (
          <div>
              <p>Viewing:</p>
              <Table data={loadedFile} />
          </div>
      );
      return output;
  }
}

/**
 * function that handles the search processing of a loaded CSVfile by putting the result in the table
 * @param args an array holding the inputted arguments, namely a column identifier and search term, passed in from REPLInput
 * @returns 
 */
function handleSearch(args: Array<string>) : JSX.Element {
  if (!isLoaded){
      return <p>Error: No CSV loaded</p>;
    }
  if (args.length < 2){
      return <p>Error: incorrect search parameters. Proper usage: 'search [column] [value]</p>;
  }
  else {
  const col = args[0]
  const value = args[1]
  const query : string = col + " " + value

  console.log("Query:", query);
  console.log("Loaded File Name:", loadedFileName);
  console.log("Query Map:", queryMap);
  
  if (queryMap[loadedFileName][query]) {
    const output = (
      <div>
        <p>Search Results:</p>
        <Table data={queryMap[loadedFileName][query]} />
      </div>
    );
    return output
  } else {
    return <p>Error: no results</p>
  }
}
}


/**
 * function that handles the mode switches and adjusts the isBrief boolean accordingly and sends an output message to the webpage
 * @param args 
 * @param isBrief 
 * @param setIsBrief 
 * @returns 
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