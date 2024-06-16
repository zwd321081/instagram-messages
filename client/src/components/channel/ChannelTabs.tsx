
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Channel.module.css"
import classnames from 'classnames'
import { useQuery } from "@apollo/client/react";
import { GET_CHANNELS } from "../../services";
import Avatar from "../Avatar";
import userContext from "../../hooks/userContext";
import { useChatStore } from "../../store";
import { getTimeTip } from "../../utils";

interface GroupTabProps {
    isSelected?: boolean;
    index?: Number;
    onClickCb?: (index: Number) => void;
    data: {
        thumb?: string;
        id: string,
        name: string,
        users: any;
        avatar?: string
    }

}


function ChannelTab({ isSelected, data, index, onClickCb }: GroupTabProps) {
    const chatData = useChatStore((state: any) => state.chatData);

    console.log("sfsdf", chatData)
    let extrInfo: any = null;
    if (chatData&&chatData.msgCreated) {
        const subData = chatData.msgCreated;
        if (data.id == subData.channel.id) {
            extrInfo = subData
        }
    }
    const userInfo = useContext(userContext);

    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const isOnly = data && data.users && data.users.length === 2 ? true : false;
    let renderData = data;
    if (isOnly && userInfo) {
        let recevier = data.users.filter((user: any) => user.id != userInfo.id);
        renderData = recevier[0]
    }


    let isMath = false;
    if (userInfo)
        isMath = data.users.some((user: any) => user.id === userInfo.id);
    if(!isMath) return null;
    return (
        <div className={isSelected ? classnames(styles.tab, styles.selectedTab) : styles.tab} onClick={() => {
            if (index != undefined) onClickCb && onClickCb(index)
            navigate({
                pathname: `/channel/${data.id}`,
                search: searchParams.toString()
            })
        }
        }>
            <Avatar src={renderData.thumb || renderData.avatar} />
            <section className={styles.tabRight}>
                <div className={styles.tabTitle}>
                    <div className={styles.title}>{renderData.name}</div>
                    <div className={styles.time}>{getTimeTip(extrInfo?.createdAt)}</div>
                </div>
                <div className={styles.subLine}>{extrInfo?.content}</div>
            </section>
        </div>
    )
}


function ChannelTabs() {
    const { data } = useQuery(GET_CHANNELS);
    const [selectedTab, setSelectedTab] = useState<Number>(-1);
    const onClickCb = (index: Number) => {
        setSelectedTab(index);
    }
    console.log("-----channel", data)
    return (
        <section className={styles.groupTabs}>
            <section className={styles.searchBar}></section>
            <div className="tabs-box">
                {data?.channels.map((channel: any, index: Number) => <ChannelTab key={channel.id} data={channel} isSelected={index == selectedTab} onClickCb={onClickCb} index={index} />)}
            </div>
        </section>
    )
}

export default ChannelTabs