import styles from "./Header.module.css"

export default function Header() {
  return (
    <header className={`${styles.header} font-mono`}>
      <div className="container">
        <div className={styles.header_content}>
          <div className={styles.header_left}>
            <a className="small bold" href="">EGOR PETROV</a>

            <nav>
              <ol className={styles.header_menu}>
                <li>
                  <a className={`${styles.header_menu_link} small muted`} href="">
                    <span className="small">01. </span>
                    WORK
                  </a>
                </li>
                <li>
                  <a className={`${styles.header_menu_link} small muted`} href="">
                    <span className="small">02. </span>
                    PROCESS
                  </a>
                </li>
                <li>
                  <a className={`${styles.header_menu_link} small muted`} href="">
                    <span className="small">03. </span>
                    ABOUT
                  </a>
                </li>
                <li>
                  <a className={`${styles.header_menu_link} small muted`} href="">
                    <span className="small">04. </span>
                    STACK
                  </a>
                </li>
                <li>
                  <a className={`${styles.header_menu_link} small muted`} href="">
                    <span className="small">05. </span>
                    PLAYGROUND</a>
                </li>
                <li>
                  <a className={`${styles.header_menu_link} small muted`} href="">
                    <span className="small">06. </span>
                    CONTACT
                  </a>
                </li>
              </ol>
            </nav>
          </div>

          <div>
            <p className="small">AVAILABLE FOR WORK</p>
          </div>
        </div>
      </div>
    </header>
  );
}
