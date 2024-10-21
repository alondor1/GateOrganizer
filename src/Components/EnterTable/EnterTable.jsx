import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../axiosConfig";
import "./EnterTable.css";
import DataTable from "react-data-table-component";
import { customStyles } from "./TableStyle.jsx";
import { Clock } from "../Clock/Clock";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GuestInfoModal = ({ guests, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose}>x</button>
        <h2>Guests Information</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.id}</td>
                <td>{guest.fullName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const EnterTable = () => {
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const dataTableRef = useRef(null);
  const isFullScreen = false;

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/entries`);
      setData(res.data);
      setRecords(res.data);
      toast.success("Data successfully refreshed!");
    } catch (err) {
      console.error(err);
      toast.error("Error fetching data");
    }
  };

  const handleConfirm = async (id, status) => {
    const newRecords = [...records];
    const indexToUpdate = newRecords.findIndex((record) => record._id === id);
    if (indexToUpdate === -1) return;

    const originalRecord = { ...newRecords[indexToUpdate] };

    if (status === "scheduled") {
      newRecords[indexToUpdate].status = "in-site";
      setRecords(newRecords);
      try {
        await axiosInstance.put(`/entries/${id}`, {
          status: "in-site",
        });
        toast.success(`Successfully updated status to "in-site"`);
      } catch (err) {
        newRecords[indexToUpdate].status = "scheduled";
        setRecords(newRecords);
        toast.error(`Error updating status to "in-site"`);
      }
    } else if (status === "in-site") {
      newRecords[indexToUpdate].status = "left";
      setRecords(newRecords);
      try {
        await axiosInstance.put(`/entries/${id}`, {
          status: "left",
        });
        toast.success(`Successfully updated status to "left"`);
      } catch (err) {
        newRecords[indexToUpdate].status = "in-site";
        setRecords(newRecords);
        toast.error(`Error updating status to "left"`);
      }
    } else if (status === "left") {
      newRecords.splice(indexToUpdate, 1);
      setRecords(newRecords);
      try {
        await axiosInstance.delete(`/entries/${id}`);
        toast.success(`Successfully removed record`);
      } catch (err) {
        newRecords.splice(indexToUpdate, 0, { ...originalRecord });
        setRecords(newRecords);
        toast.error(`Error removing record`);
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

  const refreshDataTable = () => {
    fetchData(); // Just call the fetch data function
  };

  const handleGuestClick = (guests) => {
    setSelectedGuests(guests);
    setModalOpen(true);
  };

  const columns = [
    { name: "Contact", selector: (row) => row.name, sortable: true },
    {
      name: "Guests",
      cell: (row) => (
        <button onClick={() => handleGuestClick(row.guests)}>
          {"Info Here"}
        </button>
      ),
      sortable: true,
    },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    { name: "Access Type", selector: (row) => row.accesstype, sortable: true },
    {
      name: "Arrival Date",
      selector: (row) => row.arrivaldate,
      sortable: true,
    },
    {
      name: "Arrival Time",
      selector: (row) => row.arrivaltime,
      sortable: true,
    },
    { name: "Approved By", selector: (row) => row.approver, sortable: true },
    {
      name: "Status",
      selector: (row) => <div className={row.status}>{row.status}</div>,
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <div>
          <button
            className="confirm-button"
            onClick={() => handleConfirm(row._id, row.status)}
          >
            Click to Check
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Security Side Interface</h2>

      <div
        ref={dataTableRef}
        className={`enter-table ${isFullScreen ? "full-screen" : ""}`}
      >
        <Clock />
        <input
          className="table-search"
          type="text"
          placeholder="Search...."
          onChange={handleFilter}
        />
        <button className="full-button" onClick={toggleFullScreen}>
          {isFullScreen ? "Exit Full Screen" : "Full Screen"}
        </button>
        <button onClick={refreshDataTable}>Refresh</button>
        <DataTable
          data={records}
          columns={columns}
          pagination
          paginationPerPage={7}
          customStyles={customStyles()}
        />
        <ToastContainer
          position={"bottom-right"}
          closeOnClick={true}
          pauseOnHover={false}
          autoClose={700}
        />
        <GuestInfoModal
          guests={selectedGuests}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
      <br />
    </div>
  );
};
