import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./Form.css";
import axiosInstance from "../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const QuickForm = () => {
  const { userName } = useContext(AuthContext);
  const [values, setValues] = useState({
    name: "",
    email: "",
    accesstype: "",
    approver: userName,
    status: "scheduled",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .post("/entries/quickform", values)
      .then((res) => {
        console.log(res);
        toast.success("Invitation sent successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="entry-form">
      <form onSubmit={handleSubmit}>
        <br />
        <label>Company or main visitor info:</label>
        <br />
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Constructor name here..."
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          required
        />
        <br />
        <label>Email:</label>
        <br />
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Set constructor email here..."
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          required
        />
        <br />
        <label>Access type for constructor:</label>
        <br />
        <select
          name="accesstype"
          onChange={(e) => setValues({ ...values, accesstype: e.target.value })}
          required
        >
          <option value="" disabled>
            Select access type
          </option>
          <option value="none">None</option>
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
        <button type="submit">Send invitation</button>
        <br />
        <br />
      </form>
      <ToastContainer
        autoClose={700}
        pauseOnHover={false}
        position={"top-center"}
        closeButton={false}
      />
    </div>
  );
};
