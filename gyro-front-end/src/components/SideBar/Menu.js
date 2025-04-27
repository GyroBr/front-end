import styles from "../SideBar/Sidebar.module.css";
import SideBar from "../SideBar/Sidebar";

var menuItem = document.querySelectorAll('.item_menu')

function selectLink(){
    menuItem.forEach((item) =>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

menuItem.forEach((item) =>
    item.addEventListener('click', selectLink)
)

