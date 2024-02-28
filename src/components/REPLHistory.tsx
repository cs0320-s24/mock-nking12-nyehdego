import '../styles/main.css';
import Table from './TableComponent';

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: string[];
  isBrief: boolean;
  data: string[]
}
export function REPLHistory(props : REPLHistoryProps) {
    return (
      <div className="repl-history" aria-label="repl-history">
        {/* This is where command history will go */}
        {/* TODO: To go through all the pushed commands... try the .map() function! */}
        {/* CHANGED */}
        {props.history.map((command) => (
          <p>{command}</p>
        ))}
      </div>
    );
    }