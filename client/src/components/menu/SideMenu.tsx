import { useState } from 'react'

import styles from "./SideMenu.module.css";
import bottombar from "./bottombar.png";
import menu1 from "./menu1.png";
import menu2 from "./menu2.png";
import menu3 from "./menu3.png";
import menu4 from "./menu4.png";
import menu5 from "./menu5.png";

interface CardProps {
    card: {
      imageUrl: string;
      title: string;
    };
  }

const Card:React.FC<CardProps> = ({ card: { imageUrl, title }})=>{
    return (
        <section className={styles.card}>
            <img className={styles.cardavatar} src={imageUrl}/>
            <div className={styles.cardContent}>{title}</div>
        </section>
    
    )
}

const SubMenu:React.FC<{title:string,menuList:any}>=({title,menuList})=>{
    return (
        <div className={styles.subBox}>
            <div className={styles.title}>{title}</div>
            <div className={styles.menuBox}>
                {menuList.map((card:any,index:number)=><Card key={index} card={card}/>)}
            </div>
        </div>
    )
}


export  function SideMenu() {
    const menuList = [{
        imageUrl:menu1,
        title:"Forum"
    },{
        imageUrl:menu2,
        title:"Chat"
    },{
        imageUrl:menu3,
        title:"Matches"
    },{
        imageUrl:menu4,
        title:"Memebers"
    },{
        imageUrl:menu5,
        title:"Contributors"
    
    }]
    return (
        <div className={styles.box}>
            <div className={styles.topMenuBbox}>
                <SubMenu title="Engage" menuList={menuList.slice(0,3)}/>
                <SubMenu title="People" menuList={menuList.slice(3)}/>
            </div>
            <img src={bottombar} className={styles.bottombar}/>
        </div>
    )
}
