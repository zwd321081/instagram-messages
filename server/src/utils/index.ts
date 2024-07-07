import Group from "@model/Group";
import Thread from "@model/Thread";
import User from "@model/User";


export const THREAD_CREATED_CONST = "THREAD_CREATED"
export async function initTestUsers() {
    await User.collection.drop()
    let userList = [
        { tid:1, name: 'Chris Griffin', avatar: 'https://i.postimg.cc/vB88ZM3Z/griffn.png' }, //that's me
        { tid:2, name: 'Philip J. Fry', avatar: 'https://i.postimg.cc/440sCPPH/Avatar1.png' },
        { tid:3, name: 'Cleveland Brown', avatar: 'https://i.postimg.cc/Y0hpQRcc/brown.png' },
    ];

    for (let item of userList) {
        const user = await User.findOne({ tid: item.tid });
    
        if (!user) {
          const createdUser = await User.create(item);
          console.log(`User Data ${createdUser.name} created`);
        } else {
          console.log(`User Data ${user.name} already exists`);
        }
      }
}

export async function initTestGroups() {
   await Group.collection.drop();
    let groups = [{
        name:"The boys",
        avatar:"https://i.postimg.cc/T3rTjhsP/theboys.png"
    },{
        name:"two people",
        avatar:"https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/36552442273/d15d/426a/2950/5739172380a52fc7d48863971feaf1a9.png"
    }];

    for (let item of groups) {
        const group = await Group.findOne({ name: item.name });
        if (!group) {
            const createdGroup = await Group.create(item);
            console.log(` ${createdGroup.name} created`);
        } else {
            console.log(`${group.name}  already exists`);
        }
    }

    const users = await User.find();
    const fristGroup = await Group.findOne({ name: groups[0].name });

    //add three users into first group
    if (fristGroup) {
        for (let user of users) {
            if (fristGroup.users.indexOf(user.id) === -1) {
                fristGroup.users.push(user.id);
            }
        }
        await fristGroup.save();
    }

    const secondGroup = await Group.findOne({ name: groups[1].name });


    if (secondGroup) {
        for(let i=0;i<2;i++){ //add first two into second groups
            let user = users[i]
            if(user&&secondGroup.users.indexOf(user.id) === -1){
                secondGroup.users.push(user.id)
            }
        }
        await secondGroup.save();
    }



}

async function initTestMessages() {
    Thread.collection.drop();
    await Thread.init();


}

export async function initTestDatas(){

    await initTestUsers();
    await initTestGroups();
    await initTestMessages();

}
