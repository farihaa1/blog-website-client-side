import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { flexRender, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import { FaSort } from "react-icons/fa"; 

const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: (props) => <span>{props.getValue()}</span>,
    enableColumnFilter: true,
    filterFn: "includesString",
    enableSorting: false, 
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (props) => <span>{props.getValue()}</span>,
    enableSorting: true, 
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "authorName",
    header: "Author",
    cell: (props) => <span>{props.getValue()}</span>,
    enableSorting: false, 
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "wordCount",
    header: "Total Words",
    cell: (props) => <span>{props.getValue()}</span>,
    enableSorting: false, 
    enableColumnFilter: true,
    filterFn: "includesString",
  },
];

const FeaturedBlogs = () => {
  const blogs = useLoaderData();
  const [data, setData] = useState(blogs);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? { ...prev[rowIndex], [columnId]: value }
              : row
          )
        );
      },
    },
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold text-center my-6">Featured Blogs</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left">
                    <div className="flex items-center">
                      <span>{header.column.columnDef.header}</span>
                      {header.column.getCanSort() && (
                        <FaSort
                          className="ml-2 cursor-pointer"
                          fontSize={16}
                          onClick={header.column.getToggleSortingHandler()}
                        />
                      )}
                    </div>
                    {header.column.getIsSorted() === "asc" && " 🔼"}
                    {header.column.getIsSorted() === "desc" && " 🔽"}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default FeaturedBlogs;
