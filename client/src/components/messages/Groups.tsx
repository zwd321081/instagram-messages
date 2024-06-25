
import { useContext } from "react";
import Avatar from "../Avatar";
import styles from "./Groups.module.css";
import UserContext from "../../hooks/userContext";
import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS } from "../../services";
import { GroupType,UserType } from "../../types";
const Header = () => {
  const user = useContext(UserContext);
  return (
    <div className={styles.headerBox}>
      <h1 className={styles.content}><Avatar src={user?.avatar} width={25} height={25}/><span className={styles.name}>{user?.name}</span></h1>
    </div>
  )
}

const Group = (props:GroupType)=>{
  const user = useContext(UserContext);

  let target:any = props
  if(props.users.length === 2){
    if(user){
      target = props.users.find((cell:UserType)=>cell.id != user.id)
    }
        
  }
  return (
    <div className={styles.msgBox}>
      <Avatar src={target.avatar}/>
      <section className={styles.msgContent}>
        <div className={styles.name}>{target.name}</div>
        <div className={styles.msg}><span className={styles.content}>I feel like I was frozen for 1000.I feel like I was frozen for 1000.</span><span className={styles.time}>20h</span></div>
        </section>
    </div>
  )
}


const List = ()=>{

  const {data} = useQuery(GET_ALL_GROUPS); 
  console.log(data)

  return (
    <div className={styles.listBox}>
      {data?.groups.map((group:GroupType)=><Group {...group}/>)}
    </div>
  )

}
function GroupList() {
  return (
    <section className={styles.msglistBox}>
      <Header />
      <List />
    </section>
  );
}

export default GroupList;