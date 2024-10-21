import React, { useState, useContext } from "react";
import "./Form.css";
import axiosInstance from "../../axiosConfig";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Form = () => {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guests, setGuests] = useState([{ id: "", fullName: "" }]);
  const { userName } = useContext(AuthContext);
  const [values, setValues] = useState({
    name: "",
    guests: guests, // Initialize with the guests state
    phone: "",
    accesstype: "",
    arrivaldate: "",
    arrivaltime: "",
    approver: userName,
    status: "scheduled",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update guests in the values state before submission
    const updatedValues = { ...values, guests };
    setValues(updatedValues); // Update values state with current guests

    axiosInstance
      .post("/history", updatedValues)
      .then((res) => {})
      .catch((err) => console.log(err));

    axiosInstance
      .post("/entries", updatedValues)
      .then((res) => {
        console.log(res);
        toast.success("A new schedule set successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => console.log(err));
  };

  const addGuestRow = () => {
    setGuests([...guests, { id: "", fullName: "" }]); // Add a new guest with empty fields
  };

  const decreaseGuestRow = () => {
    if (guests.length > 1) {
      // Prevent removing the last guest
      setGuests(guests.slice(0, -1));
    }
  };

  return (
    <div className="entry-form">
      <form onSubmit={handleSubmit}>
        <br />
        <label> company or main visitor info:</label>
        <br />
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Company or main visitor name here"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          required
        />
        <br />
        <button type="button" onClick={() => setShowGuestModal(true)}>
          Add Guests
        </button>
        <br />
        <label>Total guests: {guests.length}</label>
        <br />
        <br />
        <label>main contact phone number:</label>
        <br />
        <input
          type="tel"
          className="form-control"
          name="phone"
          placeholder="Phone number here"
          onChange={(e) => setValues({ ...values, phone: e.target.value })}
        />
        <br />
        <br />
        <label>Access card type :</label>
        <br />
        <select
          name="accesstype"
          onChange={(e) => setValues({ ...values, accesstype: e.target.value })}
          required
        >
          <option></option>
          <option value="none">none</option>
          <option value="visitor">Visitor</option>
          <option value="RF">RF</option>
          <option value="bezeq">Bezeq</option>
          <option value="space">חלל</option>
          <option value="יהודה">יהודה</option>
          <option value="yes">Yes</option>
          <option value="OU">OU</option>
          <option value="playout">Playout</option>
        </select>

        <br />
        <br />
        <label> Estimated arrival date:</label>
        <br />
        <input
          className="form-control"
          name="date"
          type="date"
          onChange={(e) =>
            setValues({ ...values, arrivaldate: e.target.value })
          }
          required
        />
        <br />
        <br />
        <label> Estimated arrival time:</label>
        <br />
        <input
          type="time"
          onChange={(e) =>
            setValues({ ...values, arrivaltime: e.target.value })
          }
          required
        />
        <br />
        <br />
        <button type="submit">Schedule</button>
        <br />
        <br />
      </form>

      {showGuestModal && (
        <div className="guest-modal">
          <h3>Add Guests</h3>
          <table>
            <thead>
              <tr>
                <th>Id/Passport #</th>
                <th>Full Name</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter ID"
                      value={guest.id}
                      onChange={(e) => {
                        const updatedGuests = [...guests];
                        updatedGuests[index].id = e.target.value;
                        setGuests(updatedGuests);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      value={guest.fullName}
                      onChange={(e) => {
                        const updatedGuests = [...guests];
                        updatedGuests[index].fullName = e.target.value;
                        setGuests(updatedGuests);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addGuestRow}>+</button>
          <button onClick={decreaseGuestRow}>-</button>
          <button onClick={() => setShowGuestModal(false)}>Ok</button>
        </div>
      )}
      <ToastContainer
        autoClose={700}
        pauseOnHover={false}
        position={"top-center"}
      />
    </div>
  );
};
