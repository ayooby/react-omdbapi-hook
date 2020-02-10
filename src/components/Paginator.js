import React from "react";
import Pagination from "react-bootstrap/Pagination";

function Paginator({ itemsCount, active, goToPage }) {
  active = parseInt(active);
  const totalPageCount =
    itemsCount > 10 ? parseInt(itemsCount) / 10 : itemsCount;

  const backwardStopPoint = active - 4 > 0 ? active - 4 : 1;
  const forwardStopPoint =
    totalPageCount > active + 4 ? active + 4 : totalPageCount;

  const PaginationItem = number => (
    <Pagination.Item
      active={number === active}
      onClick={() => goToPage(number)}
      key={number}
    >
      {number}
    </Pagination.Item>
  );

  const items = [];
  for (let number = active - 1; number >= backwardStopPoint; number--) {
    items.unshift(PaginationItem(number));
  }

  if (backwardStopPoint > 1) {
    items.unshift(<Pagination.Ellipsis key="key0" disabled={true} />);
  }

  for (let number = active; number <= forwardStopPoint; number++) {
    items.push(PaginationItem(number));
  }

  if (forwardStopPoint < totalPageCount) {
    items.push(<Pagination.Ellipsis key="key1" disabled={true} />);
  }

  return (
    <div>
      <Pagination>
        <Pagination.Prev onClick={() => goToPage(active - 1)} />
        {items}
        <Pagination.Next onClick={() => goToPage(active + 1)} />
      </Pagination>
    </div>
  );
}

export default Paginator;
