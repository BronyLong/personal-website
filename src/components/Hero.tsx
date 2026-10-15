import styles from './Hero.module.css'
import heroImage from '../images/hero_image.jpg'

export default function Hero() {
    return (
        <section className={`${styles.hero_page} font-mono`}>
            <div className="container">

                <div className={styles.hero_main}>
                    <div className={styles.hero_left}>
                        <div className="breadcrumbs">
                            <p className="small muted font-mono">petrov.egor / frontend / 2026</p>
                        </div>
                        <div className={styles.hero_text}>
                            <h1 className={`${styles.hero_title} font-inter regular`}>
                                I BUILD<br />
                                INTERFACES<br />
                                FOR THE WEB.
                            </h1>
                            <p className="base text-secondary">
                                I design and build web interfaces —<br />
                                from the first layout in Figma to a working application.
                            </p>
                        </div>
                        <div className={styles.hero_buttons}>
                            <a href='#' className='btn-wide btn-solid base'>
                                <span>VIEW SELECTED WORK</span>
                                <span aria-hidden="true">↓</span>
                            </a>
                            <a href='#' className='btn-wide btn-outline base'>
                                <span>GITHUB</span>
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>
                    <div className={`${styles.hero_lists} base`}>
                        <div>
                            <p className='bold'>CURRENTLY</p>
                            <ul>
                                <li><span>⟶</span> Master's student</li>
                                <li><span>⟶</span> Building Chaotic Creation</li>
                            </ul>
                        </div>
                        <div>
                            <p className='bold'>BASED IN</p>
                            <ul>
                                <li><span>⟶</span> Russia / Remote</li>
                            </ul>
                        </div>
                        <div>
                            <p className='bold'>FOCUS</p>
                            <ul>
                                <li><span>⟶</span> Frontend</li>
                                <li><span>⟶</span> UI/UX</li>
                                <li><span>⟶</span> Web Development</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.hero_media}>
                        <img src={heroImage} width="240" height="360" alt="Геометричные формы бетонной архитектуры" />
                        <div className={styles.hero_media_text}>
                            <div>
                                <p className='small muted'>INTERFACES</p>
                                <p className='small muted'>IDEAS</p>
                                <p className='small muted'>REAL PRODUCTS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
