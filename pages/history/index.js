/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Guard from "../../HOC/guard";
import Sidebar from "../../layout/sidebar";
import styles from "../../styles/History.module.css";
import { API_URL } from "../../helpers";

const History = () => {
  const [history, setHistory] = useState([]);

  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("idUser");
    setIdUser(parseInt(id));
    const token = localStorage.getItem("token");
    const headers = {
      token,
    };
    axios
      .get(`${API_URL}/all-transactions`, { headers })
      .then((res) => {
        const data = res.data.result;
        setHistory(data);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }, []);

  // number with commas
  const numberWithCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return num;
    }
  };

  return (
    <Sidebar>
      <div className={`row ${styles.historyContent}`}>
        <div className={`col-lg-12 ${styles.titleHistory}`}>
          <div className={`row`}>
            <div className={`col-8`}>
              <h5>Transaction History</h5>
            </div>

            <div className={`col-lg-4 col-3 text-lg-end pe-lg-5`}>
              <button type="button" className={`btn ${styles.btnFilter}`}>
                --Select Filter--
              </button>
            </div>
          </div>
        </div>

        <div className={`${styles.contentCard}`}>
          {history.map((e, i) => (
            <div className={`my-4 ${styles.cardHist}`} key={i}>
              <div className="row">
                {/* <div className="col-lg-9"> */}
                {/* <div className="row"> */}
                <div className="col-lg-1 col-2 text-end">
                  <img
                    src={`${API_URL}/${e.receiverUsers.image}`}
                    alt="profile"
                    className={`${styles.imageProfile}`}
                    width={62}
                    height={62}
                  />
                </div>

                <div
                  className={`col-lg-8 col-5 ms-lg-0 ms-1 d-flex flex-column ${styles.namecard}`}
                >
                  <span className={`text-capitalize ${styles.nameProfileNav}`}>
                    {`${e.receiverUsers.first_name} ${e.receiverUsers.last_name}`}
                  </span>
                  <small className={`${styles.statusTrans}`}>{e.type}</small>
                </div>
                <div
                  className={`col-lg-3 col-4 text-lg-end pe-lg-5 pt-2 
                  ${
                    e.receiver === idUser || e.type === "Top Up"
                      ? styles.colorGreen
                      : styles.colorRed
                  }
                    `}
                >
                  <p>
                    {e.receiver === idUser ? " + " : " - "}Rp.{" "}
                    {numberWithCommas(e.amount)}
                  </p>
                </div>
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default Guard(History);
