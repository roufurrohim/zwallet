import React, { useState, createRef } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../layout/sidebar";
import styles from "../../styles/TransferDetails.module.css";
import Image from "next/image";
import profile from "../../public/profile.png";
import { HiOutlinePencil } from "react-icons/hi";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import dynamic from "next/dynamic";
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

    if (name === "nominal" && value >= receiever.total) {
      setForm({
        ...form,
        nominal: receiever.total,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleTf = (e) => {
    e.preventDefault();
    console.log(form);
  };

  // handle modal
  const toggle = () => setModal(!modal);

  // handle pin
  const handleChangePin = (value) => {
    setPin(value);
  };

  const handlePin = (e) => {
    e.preventDefault();
    console.log(pin);
    setModal(!modal);
    router.push("/transfer/success");
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
                <div className="col-lg-1">
                  <Image
                    src={receiever.image}
                    alt="profile"
                    className={`${styles.imageProfile}`}
                    width={62}
                    height={62}
                  />
                </div>

                <div className="col-lg-10 d-flex flex-column">
                  <span className={`${styles.nameProfileNav}`}>
                    {receiever.name}
                  </span>
                  <small className={`${styles.statusTrans}`}>
                    {receiever.phone}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`col-lg-12 ${styles.detailsTransaction}`}>
          <div className="row">
            <div className="col-lg-4">
              <p className={`${styles.noteDetails}`}>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </p>
            </div>
          </div>
        </div>

        <div className={`col-lg-12 ${styles.formNominal}`}>
          <form onSubmit={handleTf} className="text-center position-relative">
            <input
              type="number"
              name="nominal"
              value={form.nominal}
              placeholder="0.00"
              onChange={changeHandler}
              className={`form-control mb-lg-4 ${styles.inputNominal}`}
            />

            <span className={` ${styles.available}`}>
              Rp. {receiever.total} Available
            </span>

            <input
              type="text"
              name="note"
              value={form.note}
              onChange={changeHandler}
              placeholder="Add some notes"
              className={`form-control mt-5 ${styles.inputNote}`}
            />
            <HiOutlinePencil
              size={28}
              className={`position-absolute ${styles.iconNote}`}
            />
            <div className={styles.borderNote}></div>
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
                  type="text"
                  secret
                  fields={6}
                  onChange={handleChangePin}
                  {...props}
                />
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

export default Transfer;
