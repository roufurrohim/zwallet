import React, { useState } from "react";
import Sidebar from "../../layout/sidebar";
import styles from "../../styles/Transfer.module.css";
import Image from "next/image";
import profile from "../../public/profile.png";
import { useRouter } from "next/router";


const Transfer = () => {
    const router = useRouter()
  const [history, setHistory] = useState([
    {
        id: 1,
      name: "Samuel Suhi",
      image: profile,
      phone: "+62 813-8492-9994",
      total: 50000,
    },
    {
        id: 2,
      name: "Samuel Suhi",
      image: profile,
      phone: "+62 813-8492-9994",
      total: 50000,
    },
    {
        id: 3,
      name: "Samuel Suhi",
      image: profile,
      phone: "+62 813-8492-9994",
      total: 50000,
    },
    {
        id: 4,
      name: "Samuel Suhi",
      image: profile,
      phone: "+62 813-8492-9994",
      total: 50000,
    },
    {
        id: 5,
      name: "Samuel Suhi",
      image: profile,
      phone: "+62 813-8492-9994",
      total: 50000,
    },
    {
        id: 6,
      name: "Samuel Suhi",
      image: profile,
      phone: "+62 813-8492-9994",
      total: 50000,
    },
  ]);

  const toreceiver = (id) => {
      router.push(`/transfer/${id}`)
  };

  return (
    <Sidebar>
      <div className={`row ${styles.historyContent}`}>
        <div className={`col-lg-12 ${styles.titleHistory}`}>
          <h5>Search Receiver</h5>
        </div>

        <div className={`col-lg-12 ${styles.searchContent}`}>
        {history.map((e, i) => (
          <div key={i} onClick={() => toreceiver(e.id)} className={`row ${styles.cardContact}`}>
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
                  <small className={`${styles.statusTrans}`}>{e.phone}</small>
                </div>
              </div>
            </div>
          </div>
            ))}    
        </div>

          
        
      </div>
    </Sidebar>
  );
};

export default Transfer;
