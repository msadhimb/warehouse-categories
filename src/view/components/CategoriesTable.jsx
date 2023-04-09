import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoriesTableHeader from "./CategoriesTableHeader";
import ReactPaginate from "react-paginate";

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

import "../../index.scss";
import Select from "./Select";

function Items({ currentItems }) {
  return currentItems.map((data, i) => {
    return (
      <tbody
        className="table-body border-2 border-secondary border-t-0"
        key={data.id}
      >
        <tr style={{ width: "40%" }}>
          <td aria-label="id">{i + 1}</td>
        </tr>
        <tr>
          <td>{data.name}</td>
        </tr>
        <tr aria-label="action-btn">
          <td>
            <Link
              to={`/categories-edit/${data.id}`}
              aria-label="outbound-btn"
              className="text-blue-600"
            >
              Detail
            </Link>
          </td>
        </tr>
      </tbody>
    );
  });
}

export default function CategoriesTable({ dataCategories, itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = dataCategories.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(dataCategories.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataCategories.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected + 1);
  };

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <Select data={[{ name: "Terbaru" }, { name: "Terlama" }]} />
        <div className="flex items-center">
          <p className="mx-2">{`${currentPage}/${pageCount}`}</p>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<HiOutlineChevronRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<HiOutlineChevronLeft />}
            renderOnZeroPageCount={null}
            className="pagination flex"
            previousClassName={`border-solid border-2 rounded p-1 flex justify-center items-center mx-2 hover:bg-blue-300 hover:text-white hover:border-blue-300 ${
              currentPage === 1
                ? "bg-blue-300 text-white border-blue-300"
                : "border-sky-500 "
            }`}
            nextClassName={`border-solid border-2 rounded p-1 flex justify-center items-center mx-2 hover:bg-blue-300 hover:text-white hover:border-blue-300 ${
              currentPage === pageCount
                ? "bg-blue-300 text-white border-blue-300"
                : "border-sky-500 "
            }`}
            pageLinkClassName="hidden"
          />
          <p className="mx-2">
            {currentPage > pageCount
              ? null
              : `Go to ${currentPage}/${pageCount}`}
          </p>
        </div>
      </div>
      <table>
        <CategoriesTableHeader />
        <Items currentItems={currentItems} />
      </table>
    </React.Fragment>
  );
}
