import { useState } from 'react'
import { SideMenu } from '../menu/SideMenu'
import styles from './Content.module.css'
import Channel from '../channel/Channel'


export function Content(){

    
    return (
        <div className={styles.box}>
            <SideMenu/>
            <Channel/>
        </div>
    )
}