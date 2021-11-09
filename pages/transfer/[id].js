/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Guard from "../../HOC/guard";
import Sidebar from "../../layout/sidebar";
import styles from "../../styles/TransferDetails.module.css";
import Image from "next/image";
import profile from "../../public/profile.png";
import { HiOutlinePencil } from "react-icons/hi";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import dynamic from "next/dynamic";
import axios from "axios";
import { API_URL } from "../../helpers";
const ReactCodeInput = dynamic(import("react-code-input"));

const Transfer = () => {
  const router = useRouter();

  // styling pin
  const props = {
    // className: ReactCodeInput,
    inputStyle: {
      margin: "4px",
      MozAppearance: "textfield",
      width: "43px",
      borderRadius: "10px",
      fontSize: "30px",
      height: "55px",
      backgroundColor: "white",
      color: "black",
      textAlign: "center",
      margin: "0px 10px",
      border: "1px solid rgba(169, 169, 169, 0.6)",
    },
    inputStyleInvalid: {
      margin: "4px",
      MozAppearance: "textfield",
      width: "43px",
      borderRadius: "10px",
      fontSize: "30px",
      height: "55px",
      backgroundColor: "white",
      color: "red",
      border: "1px solid rgba(169, 169, 169, 0.6)",
    },
  };

  const receiever = {
    id: 1,
    name: "Samuel Suhi",
    image: profile,
    phone: "+62 813-8492-9994",
    total: 50000,
  };

  const [user, setUser] = useState({});

  const [warning, setWarning] = useState("");

  const [dataReceiver, setDataReceiver] = useState({});

  useEffect(() => {
    const idReceiver = router.query;
    const idUser = localStorage.getItem("idUser");
    const token = localStorage.getItem("token");
    const headers = {
      token,
    };
    axios
      .get(`${API_URL}/user/${idReceiver.id}`, { headers })
      .then((res) => {
        setDataReceiver(res.data.result[0]);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
    axios
      .get(`${API_URL}/user/${idUser}`, { headers })
      .then((res) => {
        setUser(res.data.result[0]);
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }, []);

  // show modal
  const [modal, setModal] = useState(false);

  // handle pin
  const [pin, setPin] = useState("");

  const [form, setForm] = useState({
    nominal: "",
    note: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "nominal" && value >= user.balance) {
      setForm({
        ...form,
        nominal: user.balance,
      });
      setWarning("");
    } else {
      setForm({
        ...form,
        [name]: value,
      });
      setWarning("");
    }
  };

  const handleTf = (e) => {
    e.preventDefault();
    console.log(form);
  };

  // handle modal
  const toggle = () => {
    if (form.nominal === "") {
      setWarning("Input Nominal Transfer");
    } else if (user.balance === 0) {
      alert("Please Top Up First");
      router.push("/topup");
    } else {
      setModal(!modal);
    }
  };

  // handle pin
  const handleChangePin = (value) => {
    setPin(value);
    setWarning("");
  };

  const handlePin = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      token,
    };

    const dataTf = {
      receiver: router.query.id,
      amount: parseInt(form.nominal),
      balance: user.balance - form.nominal,
      notes: form.note,
      type: "Transfer",
    };
    console.log(dataTf);
    axios
      .post(`${API_URL}/pin`, { pin }, { headers })
      .then((res) => {
        console.log(res.data);
        axios
          .post(`${API_URL}/transfer`, dataTf, { headers })
          .then((res) => {
            // console.log(res.data.result.id);
            router.push(`/transfer/success?id=${res.data.result.id}`);
          })
          .catch((err) => {
            setWarning(err.response.data);
          });
      })
      .catch((err) => {
        setWarning(err.response.data.error);
      });
    setModal(!modal);
  };

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
      <div className={`row ${styles.tfDetailsContent}`}>
        <div className={`col-lg-3 ${styles.titleTransfer}`}>
          <p>Tranfer Money</p>
        </div>

        <div className={`col-lg-12`}>
          <div className={`row ${styles.cardContact}`}>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-1 col-3">
                  <img
                    src={`${API_URL}/${dataReceiver.image}`}
                    alt="profile"
                    className={`${styles.imageProfile}`}
                    width={62}
                    height={62}
                  />
                </div>

                <div className="col-lg-10 col-9 d-flex flex-column">
                  <span className={` text-capitalize ${styles.nameProfileNav}`}>
                    {`${dataReceiver.first_name} ${dataReceiver.last_name}`}
                  </span>
                  <small className={`${styles.statusTrans}`}>
                    +62 {dataReceiver.phone}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`col-lg-12 ${styles.detailsTransaction}`}>
          <div className="row">
            <div className="col-lg-4 col-11">
              <p className={`${styles.noteDetails}`}>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </p>
            </div>
          </div>
        </div>

        <div className={`col-lg-12 ${styles.formNominal}`}>
          <form className="text-center position-relative">
            <input
              type="number"
              name="nominal"
              value={form.nominal}
              placeholder="0.00"
              onChange={changeHandler}
              className={`form-control mb-lg-4 mb-2  ${styles.inputNominal}`}
            />

            <span className={` ${styles.available}`}>
              Rp. {numberWithCommas(user.balance)} Available
            </span>

            <input
              type="text"
              name="note"
              value={form.note}
              onChange={changeHandler}
              placeholder="Add some notes"
              className={`form-control mt-lg-5 mt-3 ${styles.inputNote}`}
            />
            <HiOutlinePencil
              size={28}
              className={`position-absolute ${styles.iconNote}`}
            />
            <div className={styles.borderNote}></div>
            <small className={`${styles.warningTf}`}>{warning}</small>
          </form>
        </div>

        <div className={`col-lg-10 ${styles.divBtn}`}>
          <button
            onClick={toggle}
            type="button"
            className={`btn ${styles.btnTf}`}
          >
            Continue
          </button>
        </div>

        <div className="position-absolute">
          <Modal
            isOpen={modal}
            toggle={toggle}
            centered
            className={`${styles.modalContent}`}
          >
            <ModalHeader
              className={`border-bottom-0 ${styles.modalHeader}`}
              toggle={toggle}
            >
              Enter PIN to Transfer
            </ModalHeader>
            <ModalBody>
              <div>
                <small className={`${styles.noteModal}`}>
                  Enter your 6 digits PIN for confirmation to continue
                  transferring money.{" "}
                </small>
              </div>
              <div className={`text-center my-5`}>
                <ReactCodeInput
                  type="password"
                  secret
                  fields={6}
                  onChange={handleChangePin}
                  {...props}
                />
              </div>
              <div className="text-center">
                <span className={` ${styles.warningTf}`}>{warning}</span>
              </div>
            </ModalBody>
            <ModalFooter className={`border-top-0`}>
              <Button onClick={handlePin} className={`${styles.btnModal}`}>
                Continue
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </Sidebar>
  );
};

export default Guard(Transfer);
