import '../styles/main.css';

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: string[];
  isBrief: boolean;
}
export function REPLHistory(props : REPLHistoryProps) {
    return (
              <div className="repl-history" aria-label='repl-history'>
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {/* CHANGED */}
            {props.history.map((command, index) => <p>{command}</p>)}
        </div>
    );

        {/* {props.history.map((command, index) => (
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
            // ))} */}
      {/* </div> */}
    }