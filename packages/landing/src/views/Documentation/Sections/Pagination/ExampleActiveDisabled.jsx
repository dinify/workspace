import React from "react";
// core components
import Pagination from "components/Pagination/Pagination.jsx";

const PaginationDocs = props => {
  return (
    <Pagination
      pages={[
        { disabled: true, text: "Previous" },
        { text: 1 },
        { active: true, text: 2 },
        { text: 3 },
        { text: "Next" }
      ]}
    />
  );
};

export default PaginationDocs;
