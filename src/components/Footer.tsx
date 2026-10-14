import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className='font-mono'>
      <div className="container">
        <div className={styles.footer_content}>
          <div>
            <a href='#' className="small bold">EGOR PETROV</a>
            <p className="small muted">Frontend Developer</p>
          </div> 
          <div>
            <p className="small muted">INTERFACES</p>
            <p className="small muted">IDEAS</p>
            <p className="small muted">REAL PRODUCTS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
