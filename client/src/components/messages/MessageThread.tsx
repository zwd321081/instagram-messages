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
            {/* This is instgram parody app */}
        </div>
    )

}

const Thread = () => {
    const params = useParams();
    const userInfo = useContext(userContext);
    const add_thread_sub = useSubscription(ADD_THREAD_SUBSCRIPTION);
    
    if (!params.groupId) return;

    const res = useQuery(GET_GROUP_DETAIL, {
        variables: { id: params.groupId }
    });

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
             await addThread({
                variables: {
                    content,
                    sendUser: userInfo.id,
                    group: params.groupId
                }
            })
            if (inputRef && inputRef.current && inputRef.current)
                inputRef.current.value = "";

        }
    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            onSendThread();

        }
    }
    return (
        <div className={styles.inputBox}>
            <textarea placeholder="Type a message" className={styles.input} ref={inputRef}  onKeyDown={onEnterPress}/>
            <img src={sendSvg} alt="send" className={styles.send} onClick={() => { onSendThread() }} />
        </div>
    )

}
function MessageThread() {
    const params = useParams();

    if (!params.groupId) return <div className={styles.welcome}>Welcome</div>

    return (
        <div className={styles.threadBox}>
            {/* <Header /> */}
            <Thread />
            <InputBox />
        </div>
    )
}

export default MessageThread