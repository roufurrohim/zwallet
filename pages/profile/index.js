import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../layout/sidebar";
import styles from "../../styles/Profile.module.css";
import Image from "next/image";
import profile from "../../public/profile.png";
import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlineArrowRight } from "react-icons/ai";

const Profile = () => {
  const router = useRouter();

  const users = {
    name: "Robert Chandler",
    telp: "+62813938777946",
    img: profile,
  };

  const hiddenFileInput = useRef(null);
  const handleClickImg = (e) => {
    hiddenFileInput.current.click();
  };

  const logout = () => {
    router.push("/");
  };

  return (
    <Sidebar>
      <div className={`row ${styles.historyContent}`}>
        <div className={`col-lg-12 mt-5 `}>
          <div className="row ">
            <div className="col-lg-12 d-flex flex-column justify-content-center align-items-center">
              <Image
                src={users.img}
                alt="profile"
                className={`${styles.imageProfile}`}
                width={80}
                height={80}
              />
              <div className={`${styles.packEditImg}`}>
                <input
                  type="file"
                  name="image"
                  id="image"
                  // onChange={changeHandlerImage}
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
            </div>

            <div className="col-lg-12 mt-lg-3 d-flex flex-column justify-content-center align-items-center">
              <span className={`${styles.nameProfileNav}`}>{users.name}</span>
              <small className={` mt-lg-2 ${styles.statusTrans}`}>
                {users.telp}
              </small>
            </div>

            <div className={`col-lg-12 ${styles.infoContent}`}>
              <div className={`row mb-3 ${styles.cardProfile}`}>
                <div className="col-lg-9 text-start">
                  <p className={`${styles.noProced}`}>Personal Profile</p>
                </div>
                <div className="col-lg-2">
                  <div className="text-end">
                    <p className={`${styles.bodyCardInfo}`}>
                      <AiOutlineArrowRight size={28} />
                    </p>
                  </div>
                </div>
              </div>

              <div className={`row mb-3 ${styles.cardProfile}`}>
                <div className="col-lg-9 text-start">
                  <p className={`${styles.noProced}`}>Change Password</p>
                </div>
                <div className="col-lg-2">
                  <div className="text-end">
                    <p className={`${styles.bodyCardInfo}`}>
                      <AiOutlineArrowRight size={28} />
                    </p>
                  </div>
                </div>
              </div>

              <div className={`row mb-3 ${styles.cardProfile}`}>
                <div className="col-lg-9 text-start">
                  <p className={`${styles.noProced}`}>Change PIN</p>
                </div>
                <div className="col-lg-2">
                  <div className="text-end">
                    <p className={`${styles.bodyCardInfo}`}>
                      <AiOutlineArrowRight size={28} />
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={logout}
                className={`row mb-3 ${styles.cardProfile}`}
              >
                <div className="col-lg-9 text-start">
                  <p className={`${styles.noProced}`}>Log Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Profile;
