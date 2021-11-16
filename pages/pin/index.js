import React, { useState } from "react";
import router, { useRouter } from "next/router";
import Guard from "../../HOC/guard";
import LayoutDefault from "../../layout/leftDefault";
import styles from "../../styles/Pin.module.css";
import dynamic from "next/dynamic";
import axios from "axios";
import { API_URL } from "../../helpers";
const ReactCodeInput = dynamic(import("react-code-input"));

const Pin = () => {
  const props = {
    // className: ReactCodeInput,
    inputStyle: {
      margin: "4px",
      MozAppearance: "textfield",
      width: "53px",
      borderRadius: "10px",
      fontSize: "30px",
      height: "65px",
      backgroundColor: "white",
      color: "black",
      textAlign: "center",
      // margin: "0px 10px",
      border: "1px solid rgba(169, 169, 169, 0.6)",
    },
    inputStyleInvalid: {
      margin: "4px",
      MozAppearance: "textfield",
      width: "53px",
      borderRadius: "10px",
      fontSize: "30px",
      height: "65px",
      backgroundColor: "white",
      color: "red",
      border: "1px solid rgba(169, 169, 169, 0.6)",
    },
  };
  const [pin, setPin] = useState("");
  const [warning, setWarning] = useState("");

  const handleChange = (value) => {
    setPin(value);
  };

  const handlePin = () => {
    const token = localStorage.getItem("token");
    const headers = {
      token,
    };
    axios
      .put(`${API_URL}/setpin`, { pin }, { headers })
      .then((res) => {
        router.push("/confirm");
      })
      .catch((err) => {
        setWarning(err.response.message);
      });
  };

  const toHome = () => {
    router.push("/");
  };

  return (
    <LayoutDefault>
      <div className={`row mt-lg-5 p-lg-5 ${styles.pagePin}`}>
        <div className="col-lg-12 d-lg-none d-block text-center mt-4">
          <h2 onClick={toHome} className={`${styles.titleAppsPin}`}>
            Zwallet
          </h2>
        </div>

        <div className="col-lg-10 mt-lg-5 mt-3">
          <h4 className={`${styles.titlePin}`}>
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h4>
        </div>

        <div className="col-lg-10 mt-lg-5 mt-2">
          <small className={`${styles.notePin}`}>
            Transfering money is eassier than ever, you can access Zwallet
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </small>
        </div>

        <div className="col-lg-11 d-flex justify-content-center mt-lg-5 mt-3">
          <ReactCodeInput
            type="password"
            secret
            fields={6}
            onChange={handleChange}
            {...props}
          />
        </div>
        <small className={`mt-5 ${styles.wrn}`}>{warning}</small>
        <div className="col-lg-10 mt-lg-5 mt-4">
          <div className="row">
            <div onClick={handlePin} className={`btn ${styles.btnPin}`}>
              <p className={`${styles.btnConfirm}`}>Confirm</p>
            </div>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
};

export default Guard(Pin);
