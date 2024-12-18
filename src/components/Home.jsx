import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function Home() {
  const [data, setData] = useState({
    name: "",
    rollno: "",
    degree: "",
    collegename: "",
  });
  const [loading, setloading] = useState(false);
  const [table, setTable] = useState();
  const [addData, setAddData] = useState(false);
  const [updataid, setupdataid] = useState("");

  useEffect(() => {
    getData();
  }, []);

  async function postData() {
    setloading(true);
    try {
      const responce = await axios.post(
        "https://6735ab735995834c8a93a26b.mockapi.io/college",
        data
      );
      setData(responce.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
    getData();
  }

  async function getData() {
    setAddData(true);
    try {
      const responceGet = await axios.get(
        "https://6735ab735995834c8a93a26b.mockapi.io/college"
      );
      setTable(responceGet.data);
    } catch (e) {
      console.log(e);
    } finally {
      setAddData(false);
    }
  }

  async function deletebtn(id) {
    try {
      const responceDelete = await axios.delete(
        "https://6735ab735995834c8a93a26b.mockapi.io/college/" + id
      );
      console.log(responceDelete);
    } catch (e) {
      console.log(e);
    } finally {
      getData();
      console.log("deleted");
    }
  }

  async function getUpdateList(id) {
    setupdataid(id);
    console.log(updataid);
    try {
      const responceUpdate = await axios.get(
        "https://6735ab735995834c8a93a26b.mockapi.io/college/" + id
      );
      setData({
        name: responceUpdate.data.name,
        rollno: responceUpdate.data.rollno,
        degree: responceUpdate.data.degree,
        collegename: responceUpdate.data.collegename,
      });
    } catch (e) {
      console.log(e);
    } finally {
      console.log("getUpdateList");
    }
  }
  async function updata(uid) {
    try {
      const update = await axios.put(
        "https://6735ab735995834c8a93a26b.mockapi.io/college/" + uid,
        data
      );
      console.log(update);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("updata data in big updata ");
      getData();
    }
  }

  function changeProcess(e) {
    let property = e.target.name;
    let value = e.target.value;
    setData((copyvalues) => {
      return { ...copyvalues, [property]: value };
    });
  }

  return (
    <div className="section1">
      <form>
        <div>
          <label> Name</label>
          <input
            type="text"
            name="name"
            onChange={(event) => changeProcess(event)}
            value={data.name}
          />
        </div>
        <div>
          <label> Roll No</label>
          <input
            type="text"
            name="rollno"
            onChange={(event) => changeProcess(event)}
            value={data.rollno}
          />
        </div>
        <div>
          <label> Degree</label>
          <input
            type="text"
            name="degree"
            onChange={(event) => changeProcess(event)}
            value={data.degree}
          />
        </div>
        <div>
          <label> College Name </label>
          <input
            type="text"
            name="collegename"
            onChange={(event) => changeProcess(event)}
            value={data.collegename}
          />
        </div>
        <div>
          <button type="button" onClick={() => postData()}>
            Submit
          </button>
          <button onClick={() => updata(updataid)} type="button">
            Updata data
          </button>
        </div>
      </form>
      {loading && <p>processing the data</p>}
      {addData && <p> data is added</p>}
      <div>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>degree</th>
              <th>college name</th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>
            {table &&
              table.map((value) => {
                return (
                  <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.rollno}</td>
                    <td>{value.degree}</td>
                    <td>{value.collegename}</td>
                    <td>
                      <button onClick={() => getUpdateList(value.id)}>
                        Update
                      </button>
                      <button onClick={() => deletebtn(value.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
