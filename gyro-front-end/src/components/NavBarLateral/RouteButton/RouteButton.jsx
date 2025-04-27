

import styles from './RouteButton.module.css';


export function RouteButton({iconType, text, onClick }) {
    
    return (
        <div className={styles.routeButton} onClick={onClick} role="button" tabIndex={0} aria-label={text}>
            <img src={iconType} className={styles.icon} alt={`${text} icon`} />
            <p>{text}</p>
        </div>

    )

}

