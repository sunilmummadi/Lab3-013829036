import React from "react";
import _ from "lodash";
import { Pagination } from "react-bootstrap";

const PaginationComponent = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  let items = pages.map(page => (
    <Pagination.Item
      key={page}
      active={page === currentPage}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Pagination.Item>
  ));

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
};
export default PaginationComponent;
