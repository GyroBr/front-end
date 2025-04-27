import { RouteButton } from "../RouteButton/RouteButton";
import { FotoPerfil } from "../FotoPerfil/FotoPerfil";
import { BotaoSair } from "../BotaoSair/BotaoSair";

import profile from '../../../assets/icons/iconProfile.svg';
import cardapio from '../../../assets/icons/cardapio.svg';
import dashboard from '../../../assets/icons/dashboard.svg';
import estoque from '../../../assets/icons/estoque.svg';

import styles from './NavBarLateral.module.css';

export function NavBarLateral ({ onPage, onSelectPage }) {
    console.log(onPage)

    return (
        <div className={styles.navbar}>
            <div className={styles.fotoPerfil}>
           {onPage !== 'Perfil' && 
                <FotoPerfil/>
            }
            </div>
            <div className={styles.links}>

            <RouteButton 
                iconType={profile} 
                text="Perfil" 
                onClick={() => onSelectPage('Perfil')}
            />

            <RouteButton 
                iconType={estoque} 
                text="Estoque" 
                onClick={() => onSelectPage('Estoque')}
            />

            <RouteButton 
                iconType={dashboard} 
                text="Dashboard" 
                onClick={() => onSelectPage('Dashboard')}
            />

            <RouteButton 
                iconType={cardapio} 
                text="Cardápio" 
                onClick={() => onSelectPage('cardapio')}
            />
{/* 
            <RouteButton text={'Estoque'} iconType={estoque}/>
            <RouteButton text={'Dashboard'} iconType={dashboard}/>
            <RouteButton text={'Cárdapio'} iconType={cardapio}/> */}

            </div>

            <div className={styles.botaoSair}>
               <BotaoSair/>
            </div>
        </div>
    )
}