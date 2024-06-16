
import React from 'react'
import styles from "./Channel.module.css"
import ChannelTabs from './ChannelTabs'
import ChannelChatRoom from './ChannelChatroom'
import { useQuery } from '@apollo/client/react';
import { GET_CHANNELS } from '../../services';



function Channel() {
    return (
        <section className={styles.box}>
            <ChannelTabs />
            <ChannelChatRoom />
        </section>
    )
}

export default Channel