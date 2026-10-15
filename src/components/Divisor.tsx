import styles from './Divisor.module.css'

type DivisorProps = {
    title: string;
    short: string; 
}

export default function Divisor({
    title,
    short,
}: DivisorProps) {
    return (
        <section>
            <div className='container'>
                <div className={styles.divisor_content}>
                    <div>
                        <p className='small'>{title}</p>
                    </div>
                    <div>
                        <p className='small muted'>{short}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}