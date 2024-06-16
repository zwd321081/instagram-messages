import Avatar from "../Avatar"
import styles from "./MessageThread.module.css"
import sendSvg from "./send.svg"

const Header=()=>{
    return(
        <div className={styles.header}>
            <Avatar src="https://i.postimg.cc/440sCPPH/Avatar1.png" width={24} height={24}/>
            <span className={styles.name}>Philip J. Fry</span>
        </div>
    )

}

const Thread=()=>{
    return  (
        <div className={styles.thread}>
            <div className={styles.sendMsgBox}>
                 <section className={styles.sendMsg}>We’re at the Drunken Clam!</section>
            </div>
            <div className={styles.receiveMsgBox}>
                <Avatar src="https://i.postimg.cc/440sCPPH/Avatar1.png" width={24} height={24}/>
                <div className={styles.receiveMsg}>Shoot I’m sorry. I kind of cryogenically froze myself for 1000 years 😅</div>
            </div>
            <div className={styles.sendMsgBox}>
                 <section className={styles.sendMsg}>You’re crazy man! I’ve wanted to do that for so long but Lois keeps saying no 🤬</section>
            </div>
            <div className={styles.receiveMsgBox}>
                <Avatar src="https://i.postimg.cc/440sCPPH/Avatar1.png" width={24} height={24}/>
                <div className={styles.receiveMsg}>OH GOD WHAT IS THIS PLACE. Aliens, robots oh no Peter I need your help!</div>
            </div>
        </div>
    )
}

const InputBox=()=>{
    return (
        <div className={styles.inputBox}>
            <textarea  placeholder="Type a message" className={styles.input}/>
            <img src={sendSvg} alt="send" className={styles.send}/>
        </div>
    )

}
function MessageThread() {
    return (
        <div className={styles.threadBox}>
            <Header/>
            <Thread/>
            <InputBox/>
        </div>
    )
}

export default MessageThread