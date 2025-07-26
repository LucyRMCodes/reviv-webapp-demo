import { useAuth0 } from "@auth0/auth0-react";
import styles from "../styles/header.module.css";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Header() {
  const { user, loginWithPopup, logout } = useAuth0();
  return (
    <div className={styles.headerContainer}>
      <section className={styles.header}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <section className={`${styles.headerSection} ${styles.logo}`}>
            <img
              src="/logo.png"
              style={{ aspectRatio: 8 / 10, height: "5vh" }}
            />
            <h2 style={{ color: "#ee5626", fontFamily: "poppins bold" }}>
              TechTestBlog
            </h2>
          </section>
        </Link>
        {user ? (
          <section className={styles.headerSection}>
            <h2 className={styles.username}>{user.name}</h2>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button
                className={styles.loginButton}
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </Link>
            <Link to={`/post-editor`}>
              <FaCirclePlus
                fill="#ee5626"
                fontSize={"2.5rem"}
                style={{ cursor: "pointer" }}
              />
            </Link>
          </section>
        ) : (
          <section className={styles.headerSection}>
            <button
              className={styles.loginButton}
              onClick={() => {
                loginWithPopup();
              }}
            >
              Login
            </button>
          </section>
        )}
      </section>
    </div>
  );
}

export default Header;
