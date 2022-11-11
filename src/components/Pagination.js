import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Pagination.css";
function Pagination({ totalPages, setCurrentPage }) {
  const [currentButton, setCurrentButton] = useState(1);
  //   const pages = 10;
  const numOfPages = [];

  for (let i = 1; i <= totalPages; i++) {
    numOfPages.push(i);
  }

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          className={`${
            currentButton === 1 ? "page-item disabled" : "page-item"
          }`}
        >
          <Button
            className="page-link"
            to="#"
            onClick={() =>
              setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
            }
          >
            Previous
          </Button>
        </li>
        {numOfPages.map((page, key) => {
          return (
            <li
              key={key}
              className={`${
                currentButton === page ? "page-item active" : "page-item"
              }`}
            >
              <Button
                className="page-link"
                to="#!"
                onClick={() => setCurrentButton(page)}
              >
                {page}
              </Button>
            </li>
          );
        })}
        <li
          className={`${
            currentButton === numOfPages.length
              ? "page-item disabled"
              : "page-item"
          }`}
        >
          <Button
            className="page-link"
            to="#"
            onClick={() =>
              setCurrentButton((prev) =>
                prev === numOfPages.length ? prev : prev + 1
              )
            }
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
