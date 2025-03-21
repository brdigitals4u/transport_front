import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAxios } from "../../utils/useAxios";

interface Props {
  formId: string;
  getEdit: (id: number, target: string) => void;
  formIntData?: any;
}

export default function DataTable({ formId, getEdit, formIntData }: Props) {
  const { res, mutate, isPending, error } = useAxios({
    url: "/api/auth/tabledata",
  });

  useEffect(() => {
    if (formId) {
      mutate({ formId, formIntData });
      // console.log(formId);
    }
  }, [formId]); // Added dependency

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const handleEdit = (id: number) => {
    // console.log("Edit", id);
    getEdit(id, "edit");
    // Your edit logic here
  };

  const handleDelete = (id: number) => {
    // console.log("Delete", id);
    getEdit(id, "delete");
    // Your delete logic here
  };
  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      //disableColumnMenu: true,
      sortable: false,
      headerClassName: "sticky-header", // Add header class
      cellClassName: "sticky-cell ", // Add sticky cell class
      //cellClassName: "sticky left-0 bg-white shadow z-10", // Sticky column
      renderCell: (params: any) => (
        <div className="flex gap-1 align-middle h-full py-2">
          <button
            className="p-1 rounded text-blue-500"
            onClick={() => handleEdit(params.row.id)}
          >
            <svg
              className="size-5"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.7574 2.99678L9.29145 10.4627L9.29886 14.7099L13.537 14.7024L21 7.23943V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99678C3 3.4445 3.44772 2.99678 4 2.99678H16.7574ZM20.4853 2.09729L21.8995 3.5115L12.7071 12.7039L11.2954 12.7064L11.2929 11.2897L20.4853 2.09729Z"></path>
            </svg>
          </button>
          <button
            className="p-1 rounded text-red-500"
            onClick={() => handleDelete(params.row.id)}
          >
            <svg
              className="size-5"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
          </button>
        </div>
      ),
    },
    ...(res?.data?.headers || []),
  ];
  const rows = res?.data?.data || [];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "500px",
        maxWidth: "1035px",
        overflowX: "auto",
      }}
    >
      <DataGrid
        sx={{
          height: "500px",
        }}
        rows={rows}
        columns={columns as any}
        getRowId={(row) =>
          formId === "my_forms" ||
          formId === "my_forms_sections" ||
          formId === "my_forms_columns"
            ? row.formid
            : row.id
        }
        pageSizeOptions={[10]}
        pagination
        paginationMode="client"
        rowHeight={40}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 8, page: 0 }, // Default to 5 records per page
          },
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
    </div>
  );
}
