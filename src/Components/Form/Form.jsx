import React, { useState, useContext } from "react";
import "./Form.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export const Form = () => {
  const { userName } = useContext(AuthContext);
  const [values, setValues] = useState({
    name: "",
    phone: "",
    accesstype: "",
    arrivaldate: "",
    arrivaltime: "",
    approver: userName,
    status: "scheduled",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3004/getHistories", values)
      .then((res) => {})
      .catch((err) => console.log(err));
    axios
      .post("http://localhost:3004/getEntrys", values)
      .then((res) => {
        console.log(res);
        alert("sent !");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="entry-form">
      <form onSubmit={handleSubmit}>
        <br />
        <label> Identification name:</label>
        <br />
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="id Contractor's name here"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          required
        />
        <br />
        <br />
        <label> Contractor's phone number:</label>
        <br />
        <input
          type="tel"
          className="form-control"
          name="phone"
          placeholder="phone number here"
          onChange={(e) => setValues({ ...values, phone: e.target.value })}
        />
        <br />
        <br />
        <label>Access card type :</label>
        <br />
        <select
          name="accesstype"
          onChange={(e) => setValues({ ...values, accesstype: e.target.value })}
        >
          <option value=""></option>
          <option value="visitor">visitor</option>
          <option value="RF">RF</option>
          <option value="bezeq">bezeq</option>
          <option value="space">חלל</option>
          <option value="יהודה">יהודה</option>
          <option value="yes">yes</option>
          <option value="OU">OU</option>
          <option value="playout">playout</option>
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
        />
        <br />
        <br />
        <button type="submit">schedule</button>
        <br />
        <br />
      </form>
    </div>
  );
};
