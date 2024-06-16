import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import styles from './Navigation.module.css'
// import logo from './logo.png'
// import toolbar from './toolbar.png'
// import Avatar from '../Avatar'
import userContext from '../../hooks/userContext'
import logo from "./Logo.svg"
import home from "./home.svg"
import search from "./search.svg"
import explorer from "./explore.svg"
import reels from "./reels.svg";
import messages from "./messages.svg"
import notification from "./notification.svg"
import create from "./create.svg"
import profile from "./profile.svg"



const Link = (props: { icon: string; title: string,isSelected:boolean }) => {
    const { icon, title,isSelected } = props;
    return (
        <div className={isSelected?classNames([styles.link,styles.linkSelected]):styles.link}>
            <img src={icon} className={styles.icon} />
            <span className={styles.title}>{title}</span>
        </div>

    )
}

export function Navigation() {
    // const userInfo = useContext(userContext);
    // const navigate = useNavigate();
    // const searchParams = new URLSearchParams(window.location.search);
    const [selectedIndex, setSelectedIndex] = useState(4);
    const linksData = [{icon: home, title: "Home"}, {icon: search, title: "Search"}, {icon: explorer, title: "Explorer"}, {icon: reels, title: "Reels"}, {icon: messages, title: "Messages"}, {icon: notification, title: "Notification"}, {icon: create, title: "Create"}, {icon: profile, title: "Profile"}];


    return (
        <div className={styles.navbox}>
            <img src={logo} className={styles.logo} />
            <section className={styles.links}>
                {linksData.map((item,index) => <Link icon={item.icon} title={item.title} isSelected={index == selectedIndex}/>)}
            </section>
            {/* <section><img src={logo} className={styles.logo} onClick={()=>navigate({
                pathname:"/",
                search: searchParams.toString()
            })}/></section>
            <section><img src={toolbar} className={styles.toolbar} />
                {userInfo&&<Avatar src={userInfo?.avatar} />}
            </section> */}
        </div>
    )
}