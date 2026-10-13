import styles from "./Header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_content}>
          <div className={styles.left_part}>
            <a className={styles.logo} href="">EGOR PETROV</a>

            <nav>
              <ol className={styles.header_menu}>
                <li>
                  <a className={styles.header_menu_link} href="">
                    <span className={styles.header_menu_number}>01. </span>
                    WORK
                  </a>
                </li>
                <li>
                  <a className={styles.header_menu_link} href="">
                    <span className={styles.header_menu_number}>02. </span>
                    PROCESS
                  </a>
                </li>
                <li>
                  <a className={styles.header_menu_link} href="">
                    <span className={styles.header_menu_number}>03. </span>
                    ABOUT
                  </a>
                </li>
                <li>
                  <a className={styles.header_menu_link} href="">
                    <span className={styles.header_menu_number}>04. </span>
                    STACK
                  </a>
                </li>
                <li>
                  <a className={styles.header_menu_link} href="">
                    <span className={styles.header_menu_number}>05. </span>
                    PLAYGROUND</a>
                </li>
                <li>
                  <a className={styles.header_menu_link} href="">
                    <span className={styles.header_menu_number}>06. </span>
                    CONTACT
                  </a>
                </li>
              </ol>
            </nav>
          </div>

          <div>
            <p className={styles.right_part_status}>AVAILABLE FOR WORK</p>
          </div>
        </div>
      </div>
    </header>
  );
}
