
import Avatar from "../Avatar";
import styles from "./Groups.module.css";
const Header = () => {
  return (
    <div className={styles.headerBox}>
      <h1>thegrifll</h1>
    </div>
  )
}

const Group = ()=>{
  return (
    <div className={styles.msgBox}>
      <Avatar src="https://i.postimg.cc/440sCPPH/Avatar1.png" />
      <section className={styles.msgContent}>
        <div className={styles.name}>Philip J. Fry</div>
        <div className={styles.msg}><span className={styles.content}>I feel like I was frozen for 1000.I feel like I was frozen for 1000.</span><span className={styles.time}>20h</span></div>
        </section>
    </div>
  )
}


const List = ()=>{

  return (
    <div className={styles.listBox}>
      <Group/>
      <Group/>
      <Group/>
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