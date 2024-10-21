import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode JWT
import axiosInstance from "../../axiosConfig"; // Ensure this points to your axios instance
import "react-toastify/dist/ReactToastify.css";

export const ContructorsForm = () => {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guests, setGuests] = useState([{ id: "", fullName: "" }]);
  const [formVisible, setFormVisible] = useState(true); // State to control form visibility

  const { token } = useParams(); // Get the JWT token from the URL
  const navigate = useNavigate(); // For redirecting after form submission

  const [values, setValues] = useState({
    name: "",
    guests: guests, // This will be updated during form submission
    phone: "",
    accesstype: "", // Will be set from decoded JWT
    arrivaldate: "",
    arrivaltime: "",
    approver: "", // Will be set from decoded JWT
    status: "", // Will be set from decoded JWT
  });

  useEffect(() => {
    const checkBlacklist = async (token) => {
      try {
        const response = await axiosInstance.get(
          `/entries/check-blacklist/${token}`
        );
        return response.data.blacklisted;
      } catch (error) {
        console.error("Error checking blacklist:", error);
        return false; // Default to not blacklisted if there's an error
      }
    };

    const validateToken = async () => {
      if (token) {
        const isBlacklisted = await checkBlacklist(token);
        if (isBlacklisted) {
          setFormVisible(false); // Hide the form if blacklisted
          return; // Exit early if token is blacklisted
        }

        try {
          // Decode the JWT to get values
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Current time in seconds
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            // Token is expired
            toast.error("Token is expired.");
            navigate("/"); // Redirect or handle expired token
            return; // Exit early if token is expired
          }

          setValues((prevValues) => ({
            ...prevValues,
            approver: decodedToken.approver || "", // Extract from JWT
            status: decodedToken.status || "", // Extract from JWT
            accesstype: decodedToken.accesstype || "", // Extract from JWT
          }));
        } catch (error) {
          console.error("Error decoding token:", error);
          toast.error("Invalid or expired token.");
          navigate("/"); // Redirect to an error page or handle it as needed
        }
      }
    };

    validateToken(); // Call the validate function
  }, [token, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the values with current guests
    const updatedValues = { ...values, guests };

    // Log values for debugging
    console.log("Submitting values: ", updatedValues);

    // Send data to the server
    axiosInstance
      .post("/history", updatedValues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    axiosInstance
      .post(`/entries/createwithtoken/${token}`, updatedValues) // Include token in the URL
      .then((res) => {
        console.log(res);
        toast.success("A new schedule set successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.error(
          "Error during submission:",
          err.response?.data || err.message
        );
        toast.error(
          "Error during submission: " +
            (err.response?.data?.error || "Unknown error.")
        );
      });
  };

  // Handle adding a new guest
  const addGuestRow = () => {
    setGuests([...guests, { id: "", fullName: "" }]); // Add a new guest with empty fields
  };

  // Handle removing a guest row
  const decreaseGuestRow = () => {
    if (guests.length > 1) {
      setGuests(guests.slice(0, -1)); // Remove the last guest
    }
  };

  return (
    <div className="entry-form">
      {formVisible ? ( // Conditional rendering based on formVisible
        <form onSubmit={handleSubmit}>
          <br />
          <label>Company or Main Visitor Info:</label>
          <br />
          <input
            type="text"
            className="form-control"
            name="name"
            value={values.name} // Use value from state
            placeholder="Company or main visitor name here"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            required
          />
          <br />
          <button type="button" onClick={() => setShowGuestModal(true)}>
            Add Guests
          </button>
          <br />
          <label>Total Guests: {guests.length}</label>
          <br />
          <br />
          <label>Main Contact Phone Number:</label>
          <br />
          <input
            type="tel"
            className="form-control"
            name="phone"
            placeholder="Phone number here"
            value={values.phone} // Use value from state
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />
          <br />
          <label>Estimated Arrival Date:</label>
          <br />
          <input
            className="form-control"
            name="date"
            type="date"
            value={values.arrivaldate} // Use value from state
            onChange={(e) =>
              setValues({ ...values, arrivaldate: e.target.value })
            }
            required
          />
          <br />
          <br />
          <label>Estimated Arrival Time:</label>
          <br />
          <input
            type="time"
            value={values.arrivaltime} // Use value from state
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
      ) : (
        <h3>
          Thank you for your response! <br /> <br /> <br />
          <button onClick={() => window.close()}>Exit window</button>
        </h3> // Message displayed if form is hidden
      )}

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
        autoClose={2000}
        pauseOnHover={false}
        position={"top-center"}
        closeOnClick={true}
        closeButton={false}
      />
    </div>
  );
};
