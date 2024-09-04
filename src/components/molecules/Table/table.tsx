import React, {FC, useState} from 'react';
import "./table.scss";

interface TableProps {
    data: Array<any>;
    headers: Array<string>;
    rowsPerPage?: number;
}

const Table:FC<TableProps> = ({ data, headers, rowsPerPage = 5}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentData = data.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => setCurrentPage(1);

    const handleLastPage = () => setCurrentPage(totalPages);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`page-number ${currentPage === i ? 'active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
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
                <button onClick={handleFirstPage} disabled={currentPage === 1 }>
                    Inicio
                </button>
                {renderPageNumbers()}
                <button onClick={handleLastPage} disabled={currentPage === totalPages}>
                    Final
                </button>
            </div>
        </div>
    );
};

export default Table;