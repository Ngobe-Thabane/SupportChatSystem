import React, { type JSX } from "react";

type TableProps = {
  headers: string[];
  data: (string | JSX.Element)[][];
};

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 m-4">
      <table className="table">
        <thead>
          <tr className="">
            {headers.map((header) => (
              <th key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-black">
                {row.map((cell, i) => (
                  <td key={i} className="">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
