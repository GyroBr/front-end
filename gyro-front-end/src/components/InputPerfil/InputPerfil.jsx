import styles from './InputPerfil.module.css';

export function InputPefil({ type, placeholder, habilitado , value, set}) {

    return (
        <input 
            className={styles.inputPerfil + ' ' + (habilitado ? styles.habilitado : '')}    
            type={type} 
            placeholder={placeholder}
            disabled={!habilitado} 
            value={value} 
            onChange={(e) => set(e.target.value)}
        />
    );
}
