import '../styles/main.css';

interface REPLHistoryProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    // CHANGED
    // history: string[]

    history: { command: string; output: string | JSX.Element }[];
    cur_Mode: "brief" | "verbose";
    currentFilepath: any[][] | null;
}
export function REPLHistory(props : REPLHistoryProps) {
    function commandOutput(command: string): any[][] | string | JSX.Element {
        if (command.startsWith("load_csv: ")) {
            const filepath = command.slice("load_csv: ".length).trim();
      
            const dataMap: { [index: string]: any } = {
                // insert mocked data into the map
                // something like "dataset1.csv: datasets.CSVData"

            };

            if (dataMap[filepath]) {
                return `"${filepath}" successfully loaded`;

            } else {
                return `ERROR: "${filepath}" is not valid. Try again.`
            }
    } else if (command === "view") {
        if (props.currentFilepath) {
            return (
                //something like:
                // <div>
                //    <Table data = {props.currentFilepath}/>
                // </div>
                // where Table is imported
            );
        } else {
            return "";
        }
    }

    return (
        <div className="repl-history" aria-label='repl-history'>
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {/* CHANGED */}
            {props.history.map((command, index) => (
                <div key={index}>
                    {props.cur_Mode === "verbose" && (
                        <div>
                            <p>Command: {command.command}.</p>
                            <p>Output: {command.output}</p>
                        </div>
                    )}
                    {props.cur_Mode === "brief" && (
                        <p>{command.output}</p>
                    )}
                </div>
            ))}
        </div>
    );
}