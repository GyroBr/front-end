import styles from './BotaoSair.module.css';

import logoutIcon from '../../../assets/icons/logout.svg';

export function BotaoSair() {
    return (
        <div className={styles.botaoSair}>
            <img src={logoutIcon}
            alt="icon sair" />
            <p>Sair</p>
        </div>
    )
}