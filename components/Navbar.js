import styles from "../styles/NavbarApps.module.css"
import profile from "../public/profile.png"
import Image from "next/image"
import { IoNotificationsOutline } from "react-icons/io5"

const Navbar = () => {

    const users = {
        name: "Robert Chandler",
        telp: "+62813938777946",
        img: profile,
    }

    return (
        <nav className={`container-fluid ${styles.nav}`}>
            <div className={`row ${styles.contentNav}`}>
                <div className="col-lg-4">
                    <h2 className={`${styles.titleNav}`}>Zwallet</h2>    
                </div>
                
                <div className={`col-lg-8 ${styles.profileNav}`}>
                    <div className="row">
                        <div className="col-lg-3 text-end">
                            <Image 
                            src={users.img} 
                            alt="profile"
                            className={`${styles.imageProfileNav}`} 
                            width={62} 
                            height={62} />
                        </div>

                        <div className="col-lg-7 d-flex flex-column">
                            <span className={`${styles.nameProfileNav}`}>{users.name}</span>
                            <small className={`${styles.telpProfileNav}`}>{users.telp}</small>
                        </div>

                        <div className="col-lg-2 text-start pt-2">
                            <IoNotificationsOutline className={`${styles.iconProfileNav}`} size={28} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;