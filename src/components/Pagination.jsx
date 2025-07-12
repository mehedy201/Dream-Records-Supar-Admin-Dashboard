import { Button } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dropdown from "./Dropdown";
import { useState } from "react";

const Pagination = () => {
  const totalPages = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="pagination-section">
      <Button className="pagination-btn" onClick={handlePrev}>
        <ChevronLeft /> Previous
      </Button>
      <nav>
        <ul className="pagination-ul">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={currentPage === index + 1 ? "pagination-active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(index + 1);
              }}
            >
              <a href="#">{index + 1}</a>
            </li>
          ))}

          <h3 className="pagination-ul-h3">...</h3>
        </ul>
      </nav>
      <Button
        className="pagination-btn"
        style={{ paddingLeft: "12px" }}
        onClick={handleNext}
      >
        Next <ChevronRight />
      </Button>
      <div className="pagination-dropdown-div">
        <Dropdown
          label="10 Per Page"
          options={["Option A", "Option B", "Option C"]}
        />
      </div>
    </div>
  );
};

export default Pagination;
