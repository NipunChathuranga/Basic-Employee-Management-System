import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./SignUp.css";
//import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from "mdbreact";
import { MDBCard, MDBCardTitle, MDBCardFooter, MDBCardBody } from "mdbreact";
import { useState } from "react";
import Axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [year, setYear] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [newYearD, setnewYearD] = useState(0);

  //used to check whether the form is sending input data properly.
  // const displayInfo = ()=>{
  //     console.log(name + age + country + position + year);
  // }

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      empName: name,
      empAge: age,
      empCountry: country,
      empPosition: position,
      empYear: year,
      
    }).then(() => {
      //console.log("success!!!");
      setEmployeeList([
        ...employeeList,
        {
          empName: name,
          age: age,
          country: country,
          position: position,
          year: year,
        },
      ]);
    });
  };

  

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      //console.log(response);
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeYear = (eid) => {
    Axios.put("http://localhost:3001/update", {
      empYear: newYearD,
      employeeID: eid,
    }).then((response) => {
      //alert("Updated !!!");
      setEmployeeList(
        employeeList.map((val) => {
          return val.employeeID === eid
            ? {
                employeeID: val.employeeID,
                empName: val.empName,
                country: val.country,
                age: val.age,
                position: val.position,
                year: newYearD,
              }
            : val;
        })
      );
      
    });
  };

  const deleteEmployee = (eid) => {
    console.log(eid);
    Axios.delete(`http://localhost:3001/delete/${eid}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.employeeID !== eid;
        })
      );
    });
  };
  // const clearForm = () => { 
  //   this.myFormRef.reset();
  // }
  
 

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="mx-auto" style={{ margin: "20px" }}>
          <form id="myFormRef">
            <p className="h5 text-center mb-4 mt-10">Employee Registration</p>
            <div className="grey-text">
              <MDBInput
                label="Employee name"
                id="empName"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <MDBInput
                label="Age"
                id="empAge"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={(event) => {
                  setAge(event.target.value);
                }}
              />
              <MDBInput
                label="Country"
                id="empCountry"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
              />
              <MDBInput
                label="Position"
                id="empPosition"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={(event) => {
                  setPosition(event.target.value);
                }}
              />
              <MDBInput
                label="Year"
                id="empYear"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={(event) => {
                  setYear(event.target.value);
                }}
              />
            </div>
            <div className="text-center">
              <MDBBtn id="submitForm" onClick={addEmployee}>Add Employee</MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCard
          className="card-body"
          style={{ width: "22rem", marginTop: "1rem" }}
        >
          <MDBCardBody className="my-custom-scrollbar">
            <MDBCardTitle className="text-center  font-weight-normal">
              Employee Directory
            </MDBCardTitle>
            {employeeList.map((val, key) => {
              console.log(val);
              return (
                <MDBListGroup >
                  <MDBListGroupItem>{val.empName}</MDBListGroupItem>
                  <MDBListGroupItem>{val.age}</MDBListGroupItem>
                  <MDBListGroupItem>{val.country}</MDBListGroupItem>
                  <MDBListGroupItem>{val.position}</MDBListGroupItem>
                  <MDBListGroupItem>{val.year}</MDBListGroupItem>
                  <MDBListGroupItem>
                    <MDBInput
                      label="Enter the new year."
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      onChange={(event) => {
                        setnewYearD(event.target.value);
                      }}
                    />
                    <MDBBtn
                      onClick={() => {
                        updateEmployeeYear(val.employeeID);
                      }}
                      color="primary"
                      type="submit"
                    >
                      Update
                    </MDBBtn>
                    <MDBBtn
                      rounded
                      color="danger"
                      onClick={() => {
                        deleteEmployee(val.employeeID);
                      }}
                    >
                      Delete
                    </MDBBtn>
                  </MDBListGroupItem>
                </MDBListGroup>
              );
            })}
          </MDBCardBody>

          <MDBCardFooter>
            {" "}
            <MDBBtn color="success" onClick={getEmployees}>View Employees</MDBBtn>
          </MDBCardFooter>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignUp;
