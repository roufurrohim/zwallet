import styles from "../styles/Footer.module.css"

const Footer = () => {
    return (
        <footer className={`container-fluid ${styles.contentFooter}`}>
            <div className="row">
                <div className={`col-lg-5 ${styles.reserved}`}>
                    <p>2020 Zwallet. All right reserved.</p>
                </div>
                
                <div className={`col-lg-7 ${styles.contactFooter}`}>
                    <div className="d-flex ">
                        <div className="">
                            <p>+62 5637 8882 9901</p>    
                        </div>
                        
                        <div className="ms-5">
                            <p>contact@zwallet.com</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;