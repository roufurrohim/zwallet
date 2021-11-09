/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Guard from "../../HOC/guard";
import Sidebar from "../../layout/sidebar";
import styles from "../../styles/Profile.module.css";
import Image from "next/image";
import profile from "../../public/profile.png";
import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { API_URL } from "../../helpers";

const Profile = () => {
  const router = useRouter();

  // show modal
  const [modal, setModal] = useState(false);

  const [user, setUser] = useState({});

  const [warning, setWarning] = useState("");

  const [dataImage, setDataImage] = useState({
    photo: "",
    photoPreview: "",
  });

  const fetchData = () => {
    const id = localStorage.getItem("idUser");
    const token = localStorage.getItem("token");
    const headers = {
      token,
    };
    axios
      .get(`${API_URL}/user/${id}`, { headers })
      .then((res) => {
        setUser(res.data.result[0]);
      })
      .catch((err) => {
        alert(err.response);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hiddenFileInput = useRef(null);
  const handleClickImg = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    setWarning("");
    setDataImage({
      photo: e.target.files[0],
      photoPreview: URL.createObjectURL(e.target.files[0]),
    });
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      token,
    };
    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("image", dataImage.photo);
    formData.append("descriptions", user.descriptions);

    axios
      .put(`${API_URL}/update`, formData, { headers })
      .then((res) => {
        fetchData();
        toggle();
      })
      .catch((err) => {
        console.log(err.response.data);
        setWarning(err.response.data.message);
      });
  };

  // handle modal
  const toggle = () => {
    setModal(!modal);
  };

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <Sidebar>
      <div className={`row ${styles.historyContent}`}>
        <div className={`col-lg-12 mt-5 `}>
          <div className="row ">
            <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center">
              <img
                src={`${API_URL}/${user.image}`}
                alt="profile"
                className={`${styles.imageProfile}`}
                width={80}
                height={80}
              />
              <div className={`${styles.packEditImg}`}>
                <button
                  type="button"
                  onClick={toggle}
                  className={`btn ${styles.btnEdit}`}
                >
                  <HiOutlinePencil size={18} className="me-1" />
                  Edit
                </button>
              </div>
            </div>

            <div className="col-lg-12 mt-lg-3 d-flex flex-column justify-content-center align-items-center">
              <span
                className={`text-capitalize ${styles.nameProfileNav}`}
              >{`${user.first_name} ${user.last_name}`}</span>
              <small className={` mt-lg-2 mt-4 ${styles.statusTrans}`}>
                +62 {user.phone}
              </small>
            </div>

            <div className={`col-lg-12 ${styles.infoContent}`}>
              <div className={`row mb-lg-3 mb-4 ${styles.cardProfile}`}>
                <div className="col-9 text-start">
                  <p className={`${styles.noProced}`}>Personal Profile</p>
                </div>
                <div className="col-2">
                  <div className="text-end">
                    <p className={`${styles.bodyCardInfo}`}>
                      <AiOutlineArrowRight size={28} />
                    </p>
                  </div>
                </div>
              </div>

              <div className={`row mb-lg-3 mb-4 ${styles.cardProfile}`}>
                <div className="col-9 text-start">
                  <p className={`${styles.noProced}`}>Change Password</p>
                </div>
                <div className="col-2">
                  <div className="text-end">
                    <p className={`${styles.bodyCardInfo}`}>
                      <AiOutlineArrowRight size={28} />
                    </p>
                  </div>
                </div>
              </div>

              <div className={`row mb-lg-3 mb-4 ${styles.cardProfile}`}>
                <div className="col-9 text-start">
                  <p className={`${styles.noProced}`}>Change PIN</p>
                </div>
                <div className="col-2">
                  <div className="text-end">
                    <p className={`${styles.bodyCardInfo}`}>
                      <AiOutlineArrowRight size={28} />
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={logout}
                className={`row mb-lg-3 mb-4 ${styles.cardProfile}`}
              >
                <div className="col-9 text-start">
                  <p className={`${styles.noProced}`}>Log Out</p>
                </div>
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
                    Edit Your Photo Profile
                  </ModalHeader>
                  <ModalBody>
                    <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={
                          dataImage.photoPreview === ""
                            ? `${API_URL}/${user.image}`
                            : dataImage.photoPreview
                        }
                        alt="profile"
                        className={`${styles.imageProfile}`}
                        width={150}
                        height={150}
                      />
                      <div className={`${styles.packEditImg}`}>
                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={handleChange}
                          ref={hiddenFileInput}
                          accept="image/png, image/jpg, image/jpeg"
                          style={{ display: "none" }}
                        />
                        <button
                          type="button"
                          onClick={handleClickImg}
                          className={`btn ${styles.btnEdit}`}
                        >
                          <HiOutlinePencil size={18} className="me-1" />
                          Edit
                        </button>
                      </div>
                      <small className={`mt-3 ${styles.noteWrn}`}>
                        {warning}
                      </small>
                    </div>
                  </ModalBody>
                  <ModalFooter className={`border-top-0`}>
                    <Button
                      onClick={uploadFile}
                      className={`${styles.btnModal}`}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Guard(Profile);
