import React from "react";

export default function CategoriesTableHeader() {
  return (
    <thead className="mt-4">
      <tr style={{ width: "40% " }}>
        <th aria-label="id">No</th>
      </tr>
      <tr>
        <th>Name</th>
      </tr>
      <tr>
        <th>Action</th>
      </tr>
    </thead>
  );
}
