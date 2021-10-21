import React, { useState } from "react";
import router, { useRouter } from "next/router";
import LayoutDefault from "../../layout/leftDefault";
import styles from "../../styles/Confirm.module.css";
import { AiOutlineCheck } from "react-icons/ai"

const Confirm = () => {
    


  const toHome = () => {
    router.push("/");
  };

  const toHomeApps = () => {
    router.push("/home")
  }

  return (
    <LayoutDefault>
      <div className={`row mt-lg-5 p-lg-5 ${styles.pagePin}`}>
        <div className="col-lg-12 d-lg-none d-block text-center mt-4">
          <h2 onClick={toHome} className={`${styles.titleAppsPin}`}>
            Zwallet
          </h2>
        </div>
        
        <div className="col-lg-10 mt-5">
          <div className={`${styles.iconConfirm}`}>
              <AiOutlineCheck size={28} />
          </div>
        </div>

        <div className="col-lg-10 mt-5">
          <h4 className={`${styles.titleConfirm}`}>
            Your PIN Was Successfully Created
          </h4>
        </div>
        
        <div className="col-lg-10 mt-lg-5 mt-2">
          <small className={`${styles.noteConfirm}`}>
          Your PIN was successfully created and you can now access all the features in Zwallet. Login to your new account and start exploring!
          </small>
        </div>
        
        <div className="col-lg-10 text-center mt-5">
        <div className="row justify-content-center">
                <div onClick={toHomeApps} className={`btn ${styles.btnConfirm}`}>
                    <p className={`${styles.btnTextConfirm}`}>Login Now</p>
                </div>
            </div>
        </div>

      </div>
    </LayoutDefault>
  );
};

export default Confirm;
