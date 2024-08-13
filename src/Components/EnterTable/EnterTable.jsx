import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EnterTable.css";
import DataTable from "react-data-table-component";
import { customStyles } from "./TableStyle.jsx";

export const EnterTable = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3004/entrys")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleConfirm = (id) => {
    const confirm = window.confirm("are u sure?");
    if (confirm) {
      axios
        .delete("http://localhost:3004/entrys/" + id)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  function handleFilter(event) {
    const NewData = data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(NewData);
  }

  const columns = [
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "access type",
      selector: (row) => row.accesstype,
      sortable: true,
    },
    {
      name: "arrival date",
      selector: (row) => row.arrivaldate,
      sortable: true,
    },
    {
      name: "arrival time",
      selector: (row) => row.arrivaltime,
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <div>
          <button
            className="confirm-button"
            onClick={(e) => handleConfirm(row.id)}
          >
            accept
          </button>
          <button
            className="ignore-button"
            onClick={(e) => handleConfirm(row.id)}
          >
            ignore
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="enter-table">
      <h2>attending</h2>
      <div>
        <input
          className="table-search"
          type="text"
          placeholder="search...."
          onChange={handleFilter}
        />
      </div>
      <DataTable
        data={records}
        columns={columns}
        pagination
        customStyles={customStyles()}
      ></DataTable>
      <br />
    </div>
  );
};
