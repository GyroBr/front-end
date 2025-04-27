import styles from './FotoPerfil.module.css'
import defaultImage from '../../../assets/images/userDefaultImage.jpg'


export function FotoPerfil({fotoPerfil}) {

    return (
        <div className={styles.fotoPerfil}>
            <img src={fotoPerfil ? fotoPerfil : defaultImage} 
            alt="foto de perfil" />
        </div>
    )
}