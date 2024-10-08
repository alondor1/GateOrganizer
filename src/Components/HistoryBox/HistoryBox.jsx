import React, { useState, useEffect } from "react";
import "./HistoryBox.css";
import axiosInstance from "../../axiosConfig";
import DataTable from "react-data-table-component";
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

export const HistoryBox = () => {
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  function handleFilter(event) {
    const NewData = data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(NewData);
  }

  const handleGuestClick = (guests) => {
    setSelectedGuests(guests);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(`/getHistory`);
      setData(res.data);
      setRecords(res.data);
      toast.success("Data updated");
    } catch (err) {
      console.error(err);
      toast.error("Error fetching data");
    }
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
  ];
  return (
    <div>
      <br />
      <input type="text" placeholder="Search...." onChange={handleFilter} />
      <DataTable data={records} columns={columns} pagination />
      <ToastContainer
        closeOnClick={true}
        pauseOnHover={false}
        autoClose={1000}
      />
      <GuestInfoModal
        guests={selectedGuests}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
