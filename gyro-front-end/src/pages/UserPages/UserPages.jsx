
import {NavBarLateral} from "../../components/NavBarLateral/NavBarLateral/NavBarLateral";
import { useState } from 'react';
import {Perfil} from "../../components/Perfil/Perfil";
import {DashboardFinance} from "../../components/Dashboard/DashboardFinance";
import NavTopCardapio from "../Teste2/NavTopCardapio";
import styles from './UserStyle.module.css';
import NavTop from "../Teste/NavTop";
import BarChart from "../Dashboard/DashBoardBottom/BarChart";
import ModalExcluirProduto from "../../components/ModaisProduto/ModalExcluirProduto";
import ModalAdicionarProduto from "../../components/ModaisProduto/ModalAdicionarProduto";
export function UserPages() {

    const [page, setPage] = useState('Perfil');

    const handlePageChange = (selectedPage) => {
        setPage(selectedPage);
    };
    
        console.log(page);
        
    return (
        
        <div className={styles.conteudo}>
        <NavBarLateral 
        onSelectPage={handlePageChange}
        onPage={page} />
        
        {page === 'Perfil' && <Perfil />}
        {page === 'Dashboard' && <DashboardFinance />}
        {page === 'Cardapio' && <NavTopCardapio/>}
        {page === 'Estoque' && <NavTop/>}
        {page === 'Dashboard' && <BarChart/>}
        {page === 'ModalExcluirProduto' && <ModalExcluirProduto/>}
        {page === 'ModalAdicionarProduto' && <ModalAdicionarProduto/>}
        {/* coloca o componente das tels aqui igual esta perfil e dashboard */}
    </div>
    )
}