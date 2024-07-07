import { useContext, useRef } from "react"
import Avatar from "../Avatar"
import styles from "./MessageThread.module.css"
import sendSvg from "./send.svg"
import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { ADD_THREAD_MUTATION, ADD_THREAD_SUBSCRIPTION, GET_GROUP_DETAIL } from "../../services"
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
    const userInfo = useContext(userContext);
    const add_thread_sub = useSubscription(ADD_THREAD_SUBSCRIPTION);
    console.log("add_thread_sub",add_thread_sub)
    
    if (!params.groupId) return;

    const res = useQuery(GET_GROUP_DETAIL, {
        variables: { id: params.groupId }
    });
    console.log(res, 'singleGroupData')

    if(add_thread_sub && add_thread_sub.data && add_thread_sub.data.threadCreated){
        if(add_thread_sub.data.threadCreated == params.groupId){
            res.refetch();
        }
    }

    if (!(res && res.data)) return null;
    const { group } = res.data;
    const { threads } = group||[];

    return (
        <div className={styles.thread}>
            {threads.map((item: any) => {
                const isSender = userInfo && userInfo.id == item.sendUser.id;
                if (isSender) {
                    return (
                        <div className={styles.sendMsgBox}>
                            <section className={styles.sendMsg}>{item.content}</section>
                        </div>
                    )
                } else {
                    return (
                        <div className={styles.receiveMsgBox}>
                            <Avatar src={item.sendUser.avatar} width={24} height={24} />
                            <div className={styles.receiveMsg}>{item.content}</div>
                        </div>
                    )
                }


            })}
            {/* <div className={styles.sendMsgBox}>
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
            </div> */}
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