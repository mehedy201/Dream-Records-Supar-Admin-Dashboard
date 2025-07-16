import { Button } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dropdown from "./Dropdown";

const Pagination = ({
  totalPages,
  currentPage,
  perPageItem,
  setCurrentPage,
  handlePageChange,
  customFunDropDown,
}) => {

  const handlePrev = () => {
    if (currentPage > 1) {
      const p = currentPage - 1;
      setCurrentPage(p);
      handlePageChange(p);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const p = currentPage + 1;
      setCurrentPage(p);
      handlePageChange(p);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="pagination-section">
      <Button className="pagination-btn" onClick={handlePrev}>
        <ChevronLeft /> Previous
      </Button>

      <nav>
        <ul className="pagination-ul">
          {pageNumbers.map((page, index) => (
            <li
              key={index}
              className={currentPage === page ? "pagination-active" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (page !== "...") {
                  setCurrentPage(page);
                  handlePageChange(page);
                }
              }}
              style={{ cursor: page === '...' ? 'default' : 'pointer' }}
            >
              <a href="#">{page}</a>
            </li>
          ))}
        </ul>
      </nav>

      <Button className="pagination-btn" onClick={handleNext}>
        Next <ChevronRight />
      </Button>

      <div className="pagination-dropdown-div">
        <Dropdown
          label={`${perPageItem} Per Page`}
          options={[5, 10, 20, 30, 40, 50]}
          customFunDropDown={customFunDropDown}
        />
      </div>
    </div>
  );
};

export default Pagination;


