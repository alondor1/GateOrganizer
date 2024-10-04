import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./EnterTable.css";
import DataTable from "react-data-table-component";
import { customStyles } from "./TableStyle.jsx";
import { Clock } from "../Clock/Clock";

export const EnterTable = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const dataTableRef = useRef(null);
  const isFullScreen = false;

  useEffect(() => {
    axios
      .get("http://localhost:3004/getEntrys")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleConfirm = async (id, status) => {
    const newRecords = [...records];
    const indexToUpdate = newRecords.findIndex((record) => record._id === id);
    if (indexToUpdate === -1) return; // Early return if the record isn't found

    const originalRecord = { ...newRecords[indexToUpdate] };

    // Optimistically update the UI
    if (status === "scheduled") {
      newRecords[indexToUpdate].status = "in-site";
      setRecords(newRecords);
      try {
        await axios.put(`http://localhost:3004/getEntrys/${id}`, {
          status: "in-site",
        });
      } catch (err) {
        // Handle error, revert status if necessary
        newRecords[indexToUpdate].status = "scheduled";
        setRecords(newRecords);
      }
    } else if (status === "in-site") {
      newRecords[indexToUpdate].status = "left";
      setRecords(newRecords);
      try {
        await axios.put(`http://localhost:3004/getEntrys/${id}`, {
          status: "left",
        });
      } catch (err) {
        // Handle error
        newRecords[indexToUpdate].status = "in-site";
        setRecords(newRecords);
      }
    } else if (status === "left") {
      newRecords.splice(indexToUpdate, 1);
      setRecords(newRecords);
      try {
        await axios.delete(`http://localhost:3004/getEntrys/${id}`);
      } catch (err) {
        // Handle error, revert changes
        newRecords.splice(indexToUpdate, 0, { ...originalRecord }); // Assume you have a way to restore
        setRecords(newRecords);
      }
    }
  };

  function handleFilter(event) {
    const NewData = data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(NewData);
  }

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (dataTableRef.current.requestFullscreen) {
        dataTableRef.current.requestFullscreen();
      } else if (dataTableRef.current.mozRequestFullScreen) {
        dataTableRef.current.mozRequestFullScreen();
      } else if (dataTableRef.current.webkitRequestFullscreen) {
        dataTableRef.current.webkitRequestFullscreen();
      } else if (dataTableRef.current.msRequestFullscreen) {
        dataTableRef.current.msRequestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  };

  const columns = [
    {
      name: "contact",
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
      name: "Approved by",
      selector: (row) => row.approver,
      sortable: true,
    },
    {
      name: "status",
      selector: (row) => <div className={row.status}>{row.status}</div>,
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <div>
          <button
            className="confirm-button"
            onClick={(e) => handleConfirm(row._id, row.status)}
          >
            click to check
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>attending</h2>

      <div
        ref={dataTableRef}
        className={`enter-table ${isFullScreen ? "full-screen" : ""}`}
      >
        <Clock />
        <input
          className="table-search"
          type="text"
          placeholder="search...."
          onChange={handleFilter}
        />
        <button className="full-button" onClick={toggleFullScreen}>
          {isFullScreen ? "Exit Full Screen" : "Full Screen"}
        </button>
        <DataTable
          data={records}
          columns={columns}
          pagination
          paginationPerPage={7}
          customStyles={customStyles()}
        />
      </div>
      <br />
    </div>
  );
};
