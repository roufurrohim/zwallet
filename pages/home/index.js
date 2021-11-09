/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Guard from "../../HOC/guard";
import styles from "../../styles/Dashboard.module.css";
import Sidebar from "../../layout/sidebar";
import { RiArrowUpLine } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineArrowDown } from "react-icons/ai";
import Image from "next/image";
import profile from "../../public/profile.png";
import { API_URL } from "../../helpers";
import { Bar } from "react-chartjs-2";

const Home = () => {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [idUser, setIdUser] = useState("");

  const [dataIncome, setDataIncome] = useState({});
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [chart, setChart] = useState([]);
  const [history, setHistory] = useState([]);

  // sum total income/expense
  Array.prototype.sum = function (prop) {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
      total += this[i][prop];
    }
    return total;
  };

  const fetchData = (data) => {
    for (let i = 0; i < data.length; i++) {
      setChart([...chart, data[i].amount]);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUser");
    setIdUser(parseInt(id));
    const headers = {
      token,
    };

    // get data user
    axios
      .get(`${API_URL}/user/${id}`, { headers })
      .then((res) => {
        setUser(res.data.result[0]);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });

    // for income
    axios
      .get(`${API_URL}/all-income`, { headers })
      .then((res) => {
        const dataIncome = res.data.result;
        setDataIncome(dataIncome);
        setIncome(dataIncome.sum("amount"));
      })
      .catch((err) => {
        alert(err.response.data.error);
      });

    //get data expense
    axios
      .get(`${API_URL}/all-expense`, { headers })
      .then((res) => {
        const dataExpense = res.data.result;
        setExpense(dataExpense.sum("amount"));
      })
      .catch((err) => {
        alert(err.response.data.error);
      });

    // get history
    axios
      .get(`${API_URL}/all-transactions`, { headers })
      .then((res) => {
        const data = res.data.result;
        setHistory(data.slice(Math.max(data.length - 4, 0)));
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
    fetchData(dataIncome);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(chart);

  // data chart
  const data = {
    labels: ["blue"],
    datasets: {
      label: "# of Votes",
      data: [dataIncome],
    },
  };

  // number with commas
  const numberWithCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return num;
    }
  };

  const toHistory = () => {
    router.push("/history");
  };

  const toTransfer = () => {
    router.push("/transfer");
  };

  const toTopup = () => {
    router.push("/topup");
  };

  return (
    <Sidebar>
      <div className="row">
        <div className={`col-lg-12 ${styles.infoBalance}`}>
          <div className="row">
            <div className={`col-lg-8 ${styles.balance}`}>
              <p className={`${styles.titleBalance}`}>Balance</p>
              <h2 className={`${styles.debit}`}>
                Rp. {user === "" ? 0 : numberWithCommas(user.balance)}
              </h2>
              <p className={`d-lg-block d-none ${styles.telp}`}>
                +62 {user.phone}
              </p>
            </div>
            <div className="col-lg-4">
              <div className="d-flex flex-lg-column justify-content-center align-items-center mt-4">
                <div
                  onClick={toTransfer}
                  className={`btn me-lg-0 me-3 ${styles.btnTf}`}
                >
                  <span>
                    <RiArrowUpLine size={28} className={`${styles.iconTf}`} />
                    Transfer
                  </span>
                </div>
                <div
                  onClick={toTopup}
                  className={`btn mt-lg-3 ${styles.btnTf}`}
                >
                  <span>
                    <AiOutlinePlus size={28} className={`${styles.iconTf}`} />
                    Top Up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12 mt-3">
          <div className={`row`}>
            <div className={`d-lg-block d-none col-lg-7 ${styles.income}`}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={`row ${styles.infoIncome}`}>
                    <div className="col-lg-8">
                      <AiOutlineArrowDown
                        size={32}
                        className={`${styles.iconIncome}`}
                      />
                      <p className={`${styles.titleIncome}`}>Income</p>
                      <p className={`${styles.totalIncome}`}>
                        Rp. {numberWithCommas(income)}
                      </p>
                    </div>
                    <div className="col-lg-4 ">
                      <RiArrowUpLine
                        size={32}
                        className={`${styles.iconExpnse}`}
                      />
                      <p className={`${styles.titleIncome}`}>Expense</p>
                      <p className={`${styles.totalIncome}`}>
                        Rp. {numberWithCommas(expense)}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className={`col-lg-12 ${styles.income}`}>
                  <Bar data={data} />
                </div> */}
              </div>
            </div>
            <div className={`col-lg-4 ${styles.dbdHistory}`}>
              <div className={`row`}>
                <div className={`col-lg-12`}>
                  <div className={`row`}>
                    <div className={`col-lg-9 col-8`}>
                      <h5>Transaction History</h5>
                    </div>
                    <div className={`col-lg-3 col-4`}>
                      <button
                        onClick={toHistory}
                        type="button"
                        className={`btn ${styles.btnAll}`}
                      >
                        See all
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`col-lg-12 mt-lg-3`}>
                  {history === "" ? (
                    <small>Loading...</small>
                  ) : (
                    history.map((e, i) => (
                      <div key={i} className="row my-lg-3 my-4">
                        <div className="col-2 text-end">
                          <img
                            src={`${API_URL}/${e.receiverUsers.image}`}
                            alt="profile"
                            className={`${styles.imageProfileNav}`}
                            width={52}
                            height={52}
                          />
                        </div>

                        <div className="col-5 ms-lg-0 ms-1 d-flex flex-column">
                          <span
                            className={`text-capitalize ${styles.nameProfileNav}`}
                          >
                            {`${e.receiverUsers.first_name} ${e.receiverUsers.last_name}`}
                          </span>
                          <small className={`${styles.statusTrans}`}>
                            {e.type}
                          </small>
                        </div>

                        <div
                          className={`col-4 text-start pt-2 
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
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Guard(Home);
