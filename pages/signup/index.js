import React, { useState } from "react";
import { useRouter } from "next/router";
import LayoutDefault from "../../layout/leftDefault";
import styles from "../../styles/Login.module.css";
import { BsPerson, BsTelephone } from "react-icons/bs";
import { BiShow, BiHide } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLock } from "react-icons/fi";

const Signup = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [warning, setWarning] = useState("");

  const [showPwd, setShowPwd] = useState(false);

  const toggleShow = () => setShowPwd(!showPwd);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // setWarning("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    router.push("/pin");
  };

  const toLogin = () => {
    router.push("/signup");
  };

  const toHome = () => {
    router.push("/");
  };

  return (
    <LayoutDefault>
      <div className="row p-lg-5">
        <div className="col-lg-12 d-lg-none d-block text-center mt-4">
          <h2 onClick={toHome} className={`${styles.titleAppsLogin}`}>
            Zwallet
          </h2>
        </div>
        <div className="col-lg-8 mt-lg-3 mt-3">
          <h4 className={`${styles.titleLogin}`}>
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h4>
        </div>
        <div className="col-lg-8 mt-lg-3 mt-2">
          <small className={`${styles.noteLogin}`}>
            Transfering money is eassier than ever, you can access Zwallet
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </small>
        </div>

        <div className="col-lg-9 mt-lg-4 mt-5 ms-lg-0 ps-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 col-lg-12 col-11">
              <span className={`form-label ${styles.labelLogin}`}>
                <BsPerson size={28} />
              </span>
              <input
                type="text"
                className={`border-0 ms-lg-5 ms-4 form-control ${styles.formControl}`}
                id="emailLogin"
                name="firstname"
                value={form.firstname}
                onChange={changeHandler}
                placeholder="Enter your firstname"
              />
              <div className={`${styles.borderLogin}`}></div>
            </div>

            <div className="my-4 col-lg-12 col-11">
              <span className={`form-label ${styles.labelLogin}`}>
                <BsPerson size={28} />
              </span>
              <input
                type="text"
                className={`border-0 ms-lg-5 ms-4 form-control ${styles.formControl}`}
                id="emailLogin"
                name="lastname"
                value={form.lastname}
                onChange={changeHandler}
                placeholder="Enter your lastname"
              />
              <div className={`${styles.borderLogin}`}></div>
            </div>

            <div className="my-4 col-lg-12 col-11">
              <span className={`form-label ${styles.labelLogin}`}>
                <MdOutlineMailOutline size={28} />
              </span>
              <input
                type="email"
                className={`border-0 ms-lg-5 ms-4 form-control ${styles.formControl}`}
                id="emailLogin"
                name="email"
                value={form.email}
                onChange={changeHandler}
                placeholder="example@mail.com"
              />
              <div className={`${styles.borderLogin}`}></div>
            </div>

            <div className="my-4 col-lg-12 col-11">
              <span className={`form-label ${styles.labelLogin}`}>
                <BsTelephone size={28} />
              </span>
              <input
                type="number"
                className={`border-0 ms-lg-5 ms-4 form-control ${styles.formControlPhone}`}
                id="emailLogin"
                name="phone"
                value={form.phone}
                onChange={changeHandler}
                placeholder="Enter your phone number"
              />
              <div className={`${styles.borderLogin}`}></div>
            </div>

            <div className="my-4 col-lg-12 col-11">
              <label className={`form-label ${styles.labelLogin}`}>
                <FiLock size={28} />
              </label>

              <span
                onClick={toggleShow}
                className={`position-absolute ${styles.iconShow}`}
              >
                {showPwd ? <BiShow size={24} /> : <BiHide size={24} />}
              </span>
              <input
                type={showPwd ? "text" : "password"}
                className={`border-0 ms-lg-5 ms-4 form-control ${styles.formControl}`}
                id="pass"
                name="password"
                value={form.password}
                onChange={changeHandler}
                placeholder="Enter your Password"
              />
              <div className={`${styles.borderLogin}`}></div>
            </div>

            <div className="col-lg-12 col-11 form-text text-end pt-3">
              <strong className={`${styles.noteForget}`}>
                Forgot Password ?
              </strong>
            </div>

            <div className="col-lg-12 col-11 text-center mt-3">
              <small className={styles.msgWarning}>{warning}</small>
            </div>

            <div className="row mt-lg-3 mt-4 ps-3">
              <div
                onClick={handleSubmit}
                className={`col-lg-12 col-11 mt-lg-3 mt-0 btn ${styles.btnLogin}`}
              >
                <p className={`${styles.btnSubmitLogin}`}>Sign Up</p>
              </div>
            </div>
          </form>
        </div>

        <div className="col-lg-9 col-11 mt-lg-4 mt-4 text-center">
          <p>
            Already have an account? Let’s{" "}
            <span onClick={toLogin} className={` ms-2 ${styles.toSignup}`}>
              {" "}
              Login{" "}
            </span>
          </p>
        </div>
      </div>
    </LayoutDefault>
  );
};

export default Signup;
