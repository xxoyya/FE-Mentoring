import { useEffect, useState } from "react";
import IconCaretLeft from "./icons/IconCaretLeft";
import IconCaretRight from "./icons/IconCaretRight";

const PFAPagination = ({ currentPage, totalPages, onPageChange }) => {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);

  const updateVisiblePages = () => {
    const width = window.innerWidth;
    if (width <= 480) {
      setMaxVisiblePages(4); // Mobile layout
    } else {
      setMaxVisiblePages(5); // Desktop layout
    }
  };

  // Update maxVisiblePages based on screen width
  useEffect(() => {
    updateVisiblePages(); // Initialize the value on component mount
    window.addEventListener("resize", updateVisiblePages); // Listen for window resize

    return () => {
      window.removeEventListener("resize", updateVisiblePages);
    };
  }, []);

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      // If the total pages are less than or equal to the max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const middlePagesCount = maxVisiblePages - 2; // Space left between first and last page
      const half = Math.floor(middlePagesCount / 2);

      let startPage = Math.max(2, currentPage - half);
      let endPage = Math.min(totalPages - 1, currentPage + half);

      // Adjust when near the start
      if (currentPage - half <= 1) {
        startPage = 2;
        endPage = startPage + middlePagesCount - 1;
      }
      // Adjust when near the end
      if (currentPage + half >= totalPages) {
        endPage = totalPages - 1;
        startPage = endPage - middlePagesCount + 1;
      }

      pages.push(1); // Always show the first page

      if (startPage > 2) {
        pages.push("..."); // Dots before the startPage if pages are hidden
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("..."); // Dots after the endPage if pages are hidden
      }

      pages.push(totalPages); // Always show the last page
    }

    return pages;
  };


  const visiblePages = getVisiblePages();

  const listOfPages = visiblePages.map((page, index) => (
    <li key={index}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (page !== currentPage) {
            onPageChange(page);
          }
        }}
        className={`${page === currentPage ? "active" : ""}`}
      >
        {page}
      </a>
    </li>
  ));

  return (
    <nav aria-label="pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <IconCaretLeft />
        <span>Prev</span>
      </button>

      <ul role="list" className="pagination">
        {listOfPages}
      </ul>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <span>Next</span>
        <IconCaretRight />
      </button>
    </nav>
  );
};

export default PFAPagination;
