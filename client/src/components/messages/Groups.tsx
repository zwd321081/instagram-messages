
import { useContext, useState } from "react";
import classnames from 'classnames'
import Avatar from "../Avatar";
import styles from "./Groups.module.css";
import UserContext from "../../hooks/userContext";
import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS } from "../../services";
import { GroupType, UserType,ThreadType } from "../../types";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const user = useContext(UserContext);
  return (
    <div className={styles.headerBox}>
      <h1 className={styles.content}><Avatar src={user?.avatar} width={25} height={25} /><span className={styles.name}>{user?.name}</span></h1>
    </div>
  )
}

const Group = (props: GroupType) => {
  const user = useContext(UserContext);
  const searchParams = new URLSearchParams(window.location.search);

  const navigate = useNavigate();

  const { isSelected, onClickCb, index, id } = props;

  let target: any = props
  if (props.users.length === 2) {
    if (user) {
      target = props.users.find((cell: UserType) => cell.id != user.id)
    }

  }

  const onGroupClick = () => {
    if (index != undefined) onClickCb && onClickCb(index)

    navigate({
      pathname: `/group/${id}`,
      search: searchParams.toString()
    })
  }
  const threads = props.threads;
  let lastThread:any = threads && threads.length ? threads[threads.length - 1]:null;
  return (
    <div className={isSelected ? classnames(styles.msgBox, styles.selectedGroup) : styles.msgBox} onClick={() => { onGroupClick() }}>
      <Avatar src={target.avatar} />
      <section className={styles.msgContent}>
        <div className={styles.name}>{target.name}</div>
        <div className={styles.msg}><span className={styles.content}>{lastThread?.content}</span><span className={styles.time}>20h</span></div>
      </section>
    </div>
  )
}


const List = () => {

  const { data } = useQuery(GET_ALL_GROUPS);
  const [selectedGroup, setSelectedGroup] = useState<Number>(-1);
  const onClickCb = (index: Number) => {
    setSelectedGroup(index);
  }

  if (!data?.groups.length) return 'loading'
  console.log(data)


  return (
    <div className={styles.listBox}>
      {data?.groups.map((group: GroupType, index: Number) => <Group {...group} isSelected={index == selectedGroup} onClickCb={onClickCb} index={index} />)}
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