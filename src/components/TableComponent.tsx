import React from "react";
import "../styles/main.css";

interface TableProps {
  data: any[][];
}

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