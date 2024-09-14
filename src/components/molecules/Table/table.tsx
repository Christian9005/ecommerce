import React, {FC, useState} from 'react';
import "./table.scss";

interface TableProps {
    data: Array<any>;
    headers: Array<string>;
    initialRowsPerPage?: number;
}

const Table:FC<TableProps> = ({ data, headers, initialRowsPerPage = 25}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPage(Number(event.target.value));
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>)=> {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const renderPageOptions = () => {
      const pageNumber = [];
      for (let i = 1; i <= totalPages; i++) {
          pageNumber.push(
              <option key={i} value={i}>
                  {i}
              </option>
          );
      }
      return pageNumber;
    };

    const renderRowsPerPageOptions = () => {
      const options = [10, 25, 50, 100];
      return options.map((option) => (
          <option key={option} value={option}>
              {option}
          </option>
      ));
    };

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((cell, cellIndex) => (
                                <td key={cellIndex}>{String(cell)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <div className="rows-per-page">
                    <label htmlFor="rowsPerPage">Items por página: </label>
                    <select
                        id="rowsPerPage"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                    >
                        {renderRowsPerPageOptions()}
                    </select>
                </div>

                <div className="page-selection">
                    <label htmlFor="pageSelect">Página: </label>
                    <select
                        id="pageSelect"
                        value={currentPage}
                        onChange={handlePageChange}
                    >
                        {renderPageOptions()}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Table;