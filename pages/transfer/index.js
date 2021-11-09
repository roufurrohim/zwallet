/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../helpers";
import Guard from "../../HOC/guard";
import Sidebar from "../../layout/sidebar";
import styles from "../../styles/Transfer.module.css";
import profile from "../../public/profile.png";
import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";

const Transfer = () => {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [receiver, setReceiver] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      token,
    };
    axios
      .get(`${API_URL}/users`, { headers })
      .then((res) => {
        setReceiver(res.data.result.dataOutput);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      token,
    };
    axios
      .get(`${API_URL}/users?search=${search}`, { headers })
      .then((res) => {
        setReceiver(res.data.result.dataOutput);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
    setSearch("");
  };

  const toreceiver = (id) => {
    router.push(`/transfer/${id}`);
  };

  return (
    <Sidebar>
      <div className={`row ${styles.historyContent}`}>
        <div className={`col-lg-12 ${styles.titleHistory}`}>
          <h5>Search Receiver</h5>
        </div>

        <div className={`col-lg-12 ${styles.searchContent}`}>
          <div className={`row mb-4`}>
            <div className={`col-lg-12`}>
              <form
                onSubmit={submitSearch}
                className={`${styles.formSearchTf}`}
              >
                <BiSearch size={32} className={`ms-3 ${styles.iconSearch}`} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search receiver here"
                  className={`ms-3 ${styles.inputSearchReceiver}`}
                />
              </form>
            </div>
          </div>
          {receiver.map((e, i) => (
            <div
              key={i}
              onClick={() => toreceiver(e.id)}
              className={`row ${styles.cardContact}`}
            >
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-1 col-3">
                    <img
                      src={`${API_URL}/${e.image}`}
                      alt="profile"
                      className={`${styles.imageProfile}`}
                      width={62}
                      height={62}
                    />
                  </div>

                  <div className="col-lg-10 col-9 d-flex flex-column">
                    <span
                      className={`text-capitalize ${styles.nameProfileNav}`}
                    >
                      {e.first_name} {e.last_name}
                    </span>
                    <small className={`${styles.statusTrans}`}>
                      +62 {e.phone}
                    </small>
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

export default Guard(Transfer);
