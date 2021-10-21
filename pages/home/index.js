import { useState } from "react";
import { useRouter } from "next/router"
import styles from "../../styles/Dashboard.module.css";
import Sidebar from "../../layout/sidebar";
import { RiArrowUpLine } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineArrowDown } from "react-icons/ai";
import Image from "next/image";
import profile from "../../public/profile.png";

const Home = () => {

  const router = useRouter()

  const [history, setHistory] = useState([
    {
      name: 'Samuel Suhi',
      image: profile,
      status: 'Accept',
      total: 50000
    },
    {
      name: 'Samuel Suhi',
      image: profile,
      status: 'Transfer',
      total: 50000
    },
    {
      name: 'Samuel Suhi',
      image: profile,
      status: 'Accept',
      total: 50000
    },
    {
      name: 'Samuel Suhi',
      image: profile,
      status: 'Topup',
      total: 50000
    },
  ])

  const toHistory = () => {
    router.push("/history")
  }

  const toTransfer = () => {
    router.push("/transfer")
  }

  const toTopup = () => {
    router.push("/topup")
  }

  return (
    <Sidebar>
      <div className="row">
        <div className={`col-lg-12 ${styles.infoBalance}`}>
          <div className="row">
            <div className={`col-lg-8 ${styles.balance}`}>
              <p className={`${styles.titleBalance}`}>Balance</p>
              <h2 className={`${styles.debit}`}>Rp. 120.000</h2>
              <p className={`${styles.telp}`}>+62 813-9387-7946</p>
            </div>
            <div className="col-lg-4">
              <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                <div onClick={toTransfer} className={`btn ${styles.btnTf}`}>
                  <span>
                    <RiArrowUpLine size={28} className={`${styles.iconTf}`} />
                    Transfer
                  </span>
                </div>
                <div onClick={toTopup} className={`btn mt-3 ${styles.btnTf}`}>
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
            <div className={`col-lg-7 ${styles.income}`}>
              <div className="row">
                <div className="col-lg-12">
                  <div className={`row ${styles.infoIncome}`}>
                    <div className="col-lg-8">
                      <AiOutlineArrowDown
                        size={32}
                        className={`${styles.iconIncome}`}
                      />
                      <p className={`${styles.titleIncome}`}>Income</p>
                      <p className={`${styles.totalIncome}`}>Rp. 2.120.000</p>
                    </div>
                    <div className="col-lg-4 ">
                      <RiArrowUpLine
                        size={32}
                        className={`${styles.iconExpnse}`}
                      />
                      <p className={`${styles.titleIncome}`}>Expense</p>
                      <p className={`${styles.totalIncome}`}>Rp. 1.560.000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-lg-4 ${styles.dbdHistory}`}>
              <div className={`row`}>
                <div className={`col-lg-12`}>
                  <div className={`row`}>
                    <div className={`col-lg-9`}>
                      <h5>Transaction History</h5>
                    </div>
                    <div className={`col-lg-3`}>
                      <button onClick={toHistory} type="button" className={`btn ${styles.btnAll}`}>
                        See all
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`col-lg-12 mt-lg-3`}>
                  {
                    history.map((e, i) => (

                      <div key={i} className="row my-3">
                    <div className="col-lg-2 text-end">
                      <Image
                        src={e.image}
                        alt="profile"
                        className={`${styles.imageProfileNav}`}
                        width={62}
                        height={62}
                      />
                    </div>

                    <div className="col-lg-7 d-flex flex-column">
                      <span className={`${styles.nameProfileNav}`}>
                        {e.name}
                      </span>
                      <small className={`${styles.statusTrans}`}>
                        {e.status}
                      </small>
                    </div>

                    <div className={`col-lg-3 text-start pt-2 
                    ${e.status === "Accept" || e.status === "Topup" ?  styles.colorGreen : styles.colorRed}
                    `}>
                      <p>{e.status === "Transfer" ? " - " : " + "}Rp. {e.total}</p>
                    </div>
                  </div>
                

                    ))
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Home;
