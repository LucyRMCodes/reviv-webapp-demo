import { useAuth0 } from "@auth0/auth0-react";
import styles from "../styles/header.module.css";
import { FaCirclePlus } from "react-icons/fa6";

function Header() {
  const { user, loginWithPopup, logout } = useAuth0();
  return (
    <div className={styles.headerContainer}>
      <section className={styles.header}>
        <section className={styles.headerSection}>
          <img src="logo.png" style={{ aspectRatio: 8 / 10, height: "5vh" }} />
          <h2 style={{ color: "#ee5626", fontFamily: "poppins bold" }}>
            TechTestBlog
          </h2>
        </section>
        <section className={styles.headerSection}>
          {user && <h2 className={styles.username}>{user.name}</h2>}
          <button
            className={styles.loginButton}
            onClick={() => {
              user ? logout() : loginWithPopup();
            }}
          >
            {user ? "Logout" : "Login"}
          </button>
          {user && (
            <FaCirclePlus
              fill="#ee5626"
              fontSize={"2.5rem"}
              style={{ cursor: "pointer" }}
            />
          )}
        </section>
      </section>
    </div>
  );
}

export default Header;
