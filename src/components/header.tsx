import { useAuth0 } from "@auth0/auth0-react";
import styles from "../styles/header.module.css";
import { FaCirclePlus } from "react-icons/fa6";

function Header() {
  const { user, loginWithPopup, logout } = useAuth0();
  return (
    <div className={styles.headerContainer}>
      <section className={styles.header}>
        <img src="react.svg" />
        <section className={styles.userInteractions}>
          <button
            className={styles.loginButton}
            onClick={() => {
              user ? logout() : loginWithPopup();
            }}
          >
            Login
          </button>
          {user && <FaCirclePlus fill="#ee5626" fontSize={"2.5rem"} />}
        </section>
      </section>
    </div>
  );
}

export default Header;
