import { useContext, useEffect, useRef } from "react";
import Avatar from "../Avatar"
import styles from "./Channel.module.css"
import chatnum from "./chatnum.svg"
import { useParams } from "react-router-dom"
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_CHANNELS, GET_SINGLE_CHANNEL, CREATE_POST, POST_FEED_SUBSCRIPTION, ADD_MESSAGE, POST_MSG_SUBSCRIPTION } from "../../services";
import userContext from "../../hooks/userContext";
import { useChatStore } from "../../store";
import { getTimeTip } from "../../utils";

interface Msg{
    content: String
    createdAt:Number
    sendUser: {
        id:string,
        name:string,
        avatar:string
    }
    receiveUser?: any
}


function ChannelChatRoom() {
    const params = useParams();
    const setChatData = useChatStore((state:any) => state.setChatData);

    const [addMessage] = useMutation(ADD_MESSAGE);
    const userInfo = useContext(userContext);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const subMsg = useSubscription(POST_MSG_SUBSCRIPTION);
    console.log("POST_MSG_SUBSCRIPTION",subMsg);

    if(subMsg&&subMsg.data){
        setChatData(subMsg.data)
    }

    // useEffect(() => {
    //     if(subMsg&&subMsg.data){
    //         setChatData(subMsg.data)
    //     }
    
    // },[subMsg])
    //用mutaion oberserver监听最新已读一条的msgId
    // 笔记总的数量里面事件>=msgId->createdAt

    //lastSeenMsg:Message
    //Message:status 1 unread 2 read



    const singleChannelData = useQuery(GET_SINGLE_CHANNEL, {
        variables: { id: params.channelId||'0' }
    })

    if(subMsg&&subMsg.data&&subMsg.data.msgCreated){
        singleChannelData.refetch();
    }


    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            // createPost({variables:{
            //     author:"zwd12",
            //     comment:"this is great book"
            // }})
            // addMessage({
            //     variables: {
            //         content: "Hello, Apollo!",
            //         sendUser: "11",
            //         channel: "111"
            //     }
            // });
            if (userInfo) {
                let content = e.currentTarget.value;
                const sendUser = userInfo.id
                const channel = params.channelId
                addMessage({
                    variables: {
                        content,
                        sendUser,
                        channel
                    }
                });
                if(inputRef&&inputRef.current&&inputRef.current)
                 inputRef.current.value="";
            }

        }
    }

    const renderMsgs=(msgs:any)=>{
        if(msgs&&msgs.length){
            return msgs.map((msg:Msg)=>{
                if(userInfo&& msg.sendUser.id == userInfo.id){
                    return (
                        <div className={styles.msgSender}>
                        <section className={styles.msgBox}>
                            <div className={styles.info}>
                                <span>{userInfo.name}</span>
                                <span className={styles.time}>{getTimeTip(msg?.createdAt)}</span>
                            </div>
                            <div className={styles.msg}>{msg.content}</div>
                        </section>
                        <Avatar src={userInfo.avatar} />
                    </div>
                    )
                }else{
                    return (
                        <div className={styles.msgReceiver}>
                        <Avatar src={msg.sendUser.avatar} />
                            <section className={styles.msgBox}>
                                <div className={styles.info}>
                                    <span>{msg.sendUser.name}</span>
                                    <span className={styles.time}>{getTimeTip(msg?.createdAt)}</span>
                                </div>
                                <div className={styles.msg}>{msg.content}</div>
                            </section>
                        </div>
                    )
                }
            })
        }else
         return null;
        
    }

    if(!params.channelId) return <div className={styles.welcome}>Welcome</div>


    return (
        <div className={styles.chatBox}>
            <section className={styles.chatHead}>
                <div className={styles.chatTitle}>Share your Story</div>
                <div className={styles.chatNum}>
                    <img src={chatnum} />
                    <span className={styles.realNum}>{singleChannelData.data?.channel?.users.length}</span>
                </div>
            </section>
            <section className={styles.chatDisplay}>
                {singleChannelData?.data?.channel&&renderMsgs(singleChannelData.data.channel.msgs)}
               
            </section>
            <section className={styles.chatInputBox}>
                <textarea className={styles.chatInput} placeholder="Type your message here..." onKeyDown={onEnterPress} ref={inputRef}></textarea>
            </section>
        </div>
    )
}

export default ChannelChatRoom