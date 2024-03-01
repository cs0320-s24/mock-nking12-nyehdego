import React from "react";
import "../styles/main.css";
/**
 * This is the component that forms the table given the 2d array corresponding to the data from view or search
 */
interface TableProps {
  data: any[][];
  header: string;
}

/**
 * Builds the table and returns it to the output
 * CSS design is in main.css
 * @param data
 * @returns 
 */

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            {data[0].map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;