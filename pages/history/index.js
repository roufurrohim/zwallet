import React, { useState } from "react";
import Sidebar from "../../layout/sidebar";
import styles from "../../styles/History.module.css";
import Image from "next/image";
import profile from "../../public/profile.png";

const History = () => {
  const [history, setHistory] = useState([
    {
      name: "Samuel Suhi",
      image: profile,
      status: "Accept",
      total: 50000,
    },
    {
      name: "Samuel Suhi",
      image: profile,
      status: "Transfer",
      total: 50000,
    },
    {
      name: "Samuel Suhi",
      image: profile,
      status: "Accept",
      total: 50000,
    },
    {
      name: "Samuel Suhi",
      image: profile,
      status: "Topup",
      total: 50000,
    },
    {
      name: "Samuel Suhi",
      image: profile,
      status: "Topup",
      total: 50000,
    },
    {
      name: "Samuel Suhi",
      image: profile,
      status: "Topup",
      total: 50000,
    },
  ]);

  return (
    <Sidebar>
      <div className={`row ${styles.historyContent}`}>
        <div className={`col-lg-12 ${styles.titleHistory}`}>
          <div className={`row `}>
            <div className={`col-lg-8`}>
              <h5>Transaction History</h5>
            </div>

            <div className={`col-lg-4 text-end pe-lg-5`}>
              <button type="button" className={`btn ${styles.btnFilter}`}>
                --Select Filter--
              </button>
            </div>
          </div>
        </div>

        {history.map((e, i) => (
          <div key={i} className="row my-2">
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-1">
                  <Image
                    src={e.image}
                    alt="profile"
                    className={`${styles.imageProfile}`}
                    width={62}
                    height={62}
                  />
                </div>

                <div className="col-lg-10 d-flex flex-column">
                  <span className={`${styles.nameProfileNav}`}>{e.name}</span>
                  <small className={`${styles.statusTrans}`}>{e.status}</small>
                </div>
              </div>
            </div>

            <div
              className={`col-lg-3 text-end pe-5 pt-2 
                    ${
                      e.status === "Accept" || e.status === "Topup"
                        ? styles.colorGreen
                        : styles.colorRed
                    }
                    `}
            >
              <p>
                {e.status === "Transfer" ? " - " : " + "}Rp. {e.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Sidebar>
  );
};

export default History;
