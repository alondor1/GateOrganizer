import React, { useEffect, useState } from "react";
import "./ManageBox.css";
import axios from "axios";
import DataTable from "react-data-table-component";

export const ManageBox = () => {
  const [data, setData] = useState([]);
  const [values, setValues] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    accesskey: "",
    role: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3004/getUsers")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      name: "first name",
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: "last name",
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "access key",
      selector: (row) => row.accesskey,
      sortable: true,
    },
    {
      name: "role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "",
      selector: (row) => (
        <button onClick={(e) => handleDelete(row._id)}>delete</button>
      ),
      sortable: true,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3004/getUsers", values)
      .then((res) => {
        console.log(res);
        alert("The user has successfully registered !");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "this action is irreversible , are you sure"
    );
    if (confirm) {
      axios
        .delete(`http://localhost:3004/getUsers/${id}`)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <h1>site users managment</h1>
      <div className="manage-box">
        <form onSubmit={handleSubmit} className="user-form">
          <label> Email:</label>
          <br />
          <input
            name="email"
            placeholder="Email..."
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />

          <br />
          <label> Password</label>
          <br />
          <input
            name="password"
            placeholder="Password..."
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />

          <br />
          <label>First name:</label>
          <br />
          <input
            name="firstname"
            placeholder="first name..."
            onChange={(e) =>
              setValues({ ...values, firstname: e.target.value })
            }
            required
          />

          <br />
          <label> last name:</label>
          <br />
          <input
            name="lastname"
            placeholder="last name..."
            onChange={(e) => setValues({ ...values, lastname: e.target.value })}
            required
          />

          <br />
          <label>Access key :</label>
          <br />
          <select
            name="access key :"
            onChange={(e) =>
              setValues({ ...values, accesskey: e.target.value })
            }
            required
          >
            <option value=""></option>
            <option value="user">user</option>
            <option value="security">security</option>
            <option value="admin">admin</option>
          </select>
          <br />
          <label>role :</label>
          <br />
          <select
            name="role :"
            onChange={(e) => setValues({ ...values, role: e.target.value })}
            required
          >
            <option value=""></option>
            <option value="user">admin</option>
            <option value="security">security</option>
          </select>
          <br />
          <br />
          <button type="submit">register</button>
          <br />
        </form>
        <div className="user-table">
          <DataTable data={data} columns={columns}></DataTable>
        </div>
      </div>
    </div>
  );
};