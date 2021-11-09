/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Nav } from "reactstrap";
import { NavLink } from "react-router-dom";
import { BsBell, BsHouseDoor, BsPerson } from "react-icons/bs";
import styles from "../styles/NavbarApps.module.css";
import profile from "../public/profile.png";
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";
import axios from "axios";
import { API_URL } from "../helpers";

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = useState({});

  const users = {
    name: "Robert Chandler",
    telp: "+62813938777946",
    img: profile,
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUser");
    const headers = {
      token,
    };
    axios
      .get(`${API_URL}/user/${id}`, { headers })
      .then((res) => {
        setUser(res.data.result[0]);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  const toLanding = () => {
    router.push("/");
  };

  const toProfile = () => {
    router.push("/profile");
  };

  const toDash = () => {
    router.push("/home");
  };

  return (
    <div>
      <nav className={`container-fluid d-lg-block d-none ${styles.nav}`}>
        <div className={`row ${styles.contentNav}`}>
          <div className="col-4">
            <h2 onClick={toLanding} className={`${styles.titleNav}`}>
              Zwallet
            </h2>
          </div>

          <div className={`col-8 ${styles.profileNav}`}>
            <div className="row">
              <div className="col-lg-3 text-end">
                <img
                  onClick={toProfile}
                  src={`${API_URL}/${user.image}`}
                  alt="profile "
                  className={`${styles.imageProfileNav}`}
                  width={62}
                  height={62}
                />
              </div>

              <div className="col-lg-6 d-lg-block d-none d-flex flex-column">
                <div className="row">
                  <div className="col-12">
                    <span
                      className={`text-capitalize ${styles.nameProfileNav}`}
                    >
                      {`
                ${user.first_name} ${user.last_name}`}
                    </span>
                  </div>
                  <div className="col-12">
                    <small className={`${styles.telpProfileNav}`}>
                      +62 {user.phone}
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-lg-2 text-start pt-2">
                <IoNotificationsOutline
                  className={`${styles.iconProfileNav}`}
                  size={28}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* navbar bottom */}
      <nav
        className="d-lg-none d-block navbar navbarBottom fixed-bottom navbar-light"
        role="navigation"
      >
        <Nav className="w-100 h-100">
          <div className=" d-flex flex-row bg-white p-2 justify-content-around w-100">
            <div className="row d-flex iconNavbar   flex-column justify-content-center align-items-center">
              <BsHouseDoor onClick={toDash} size={28} />
            </div>

            <div className="row d-flex iconNavbar flex-column  justify-content-center align-items-center">
              <BsBell size={28} />
            </div>

            <div className="row d-flex iconNavbar flex-column  justify-content-center align-items-center">
              <BsPerson onClick={toProfile} size={28} />
            </div>
          </div>
        </Nav>
      </nav>
    </div>
  );
};

export default Navbar;
