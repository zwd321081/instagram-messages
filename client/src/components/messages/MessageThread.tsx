import { useContext, useRef } from "react"
import Avatar from "../Avatar"
import styles from "./MessageThread.module.css"
import sendSvg from "./send.svg"
import { useMutation,useQuery } from "@apollo/client"
import { ADD_THREAD_MUTATION, GET_GROUP_DETAIL } from "../../services"
import userContext from "../../hooks/userContext"
import { useParams } from "react-router-dom"

const Header = () => {
    return (
        <div className={styles.header}>
            <Avatar src="https://i.postimg.cc/440sCPPH/Avatar1.png" width={24} height={24} />
            <span className={styles.name}>Philip J. Fry</span>
        </div>
    )

}

const Thread = () => {
    const params = useParams();
    if(!params.groupId ) return;

    const singleGroupData = useQuery(GET_GROUP_DETAIL,{
        variables: { id: params.groupId }
    });
    console.log(singleGroupData,'singleGroupData')

    return (
        <div className={styles.thread}>
            <div className={styles.sendMsgBox}>
                <section className={styles.sendMsg}>We’re at the Drunken Clam!</section>
            </div>
            <div className={styles.receiveMsgBox}>
                <Avatar src="https://i.postimg.cc/440sCPPH/Avatar1.png" width={24} height={24} />
                <div className={styles.receiveMsg}>Shoot I’m sorry. I kind of cryogenically froze myself for 1000 years 😅</div>
            </div>
            <div className={styles.sendMsgBox}>
                <section className={styles.sendMsg}>You’re crazy man! I’ve wanted to do that for so long but Lois keeps saying no 🤬</section>
            </div>
            <div className={styles.receiveMsgBox}>
                <Avatar src="https://i.postimg.cc/440sCPPH/Avatar1.png" width={24} height={24} />
                <div className={styles.receiveMsg}>OH GOD WHAT IS THIS PLACE. Aliens, robots oh no Peter I need your help!</div>
            </div>
        </div>
    )
}

const InputBox = () => {
    const params = useParams();
    const [addThread] = useMutation(ADD_THREAD_MUTATION);
    const userInfo = useContext(userContext);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const onSendThread = async () => {
        if (userInfo) {
            let content = inputRef.current?.value;
            if (!content) return;
            const res = await addThread({
                variables: {
                    content,
                    sendUser: userInfo.id,
                    group: params.groupId
                }
            })
            if (res) {
                console.log(res)
              
            }
            if (inputRef && inputRef.current && inputRef.current)
                inputRef.current.value = "";

        }
    }
    return (
        <div className={styles.inputBox}>
            <textarea placeholder="Type a message" className={styles.input} ref={inputRef} />
            <img src={sendSvg} alt="send" className={styles.send} onClick={() => { onSendThread() }} />
        </div>
    )

}
function MessageThread() {
    const params = useParams();

    if (!params.groupId) return <div className={styles.welcome}>Welcome</div>

    return (
        <div className={styles.threadBox}>
            <Header />
            <Thread />
            <InputBox />
        </div>
    )
}

export default MessageThread