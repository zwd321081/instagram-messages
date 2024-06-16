import Channel from "@model/Channel";
import Msg from "@model/Msg";
import User from "@model/User";


export async function createTestUsers() {
    await User.collection.drop()
    let userList = [
        { tid:1, name: 'Cavill Lane', avatar: 'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/36505491862/791a/762e/c6f4/c8c292219e5bbb748c2981f505f61924.png' },
        { tid:2, name: 'Albert Flores', avatar: 'https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/36505510883/d37b/5f6e/451a/4b08b5bfb26021dc3679296713cf7355.png' },
        { tid:3, name: 'Darlene Robertson', avatar: 'https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/36505533027/83da/1615/35de/82f31c167d586bc3b3d72d7d49169222.png' },
    ];

    userList.forEach(async item => {
        const user = await User.findOne({ tid: item.tid });
        if(!user) {
          const createdUser =  await User.create(item);
          console.log(`User Data${createdUser.name} created`)
        }else{
            console.log(`User Data ${user.name} already exists`)
        }

    });
}

export async function createTestChannels() {
   await Channel.collection.drop();
    let channelList = [{
        name:"Happy Three family",
        thumb:"https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/36552442273/d15d/426a/2950/5739172380a52fc7d48863971feaf1a9.png"
    },{
        name:"chat with one people",
        thumb:"https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/36552441610/dcca/c32c/a596/b48ce82c79c81436c7f8d93309e9f4c6.png"
    }];

    // Refactor with a for...of loop to handle async/await properly
    for (let item of channelList) {
        const channel = await Channel.findOne({ name: item.name });
        if (!channel) {
            const createdChannel = await Channel.create(item);
            console.log(`Channel data ${createdChannel.name} created`);
        } else {
            console.log(`Channel data ${channel.name} already exists`);
        }
    }

    // Retrieve users and channels within the async context
    const users = await User.find();
    const firstChannel = await Channel.findOne({ name: channelList[0].name });
    const secondChannel = await Channel.findOne({ name: channelList[1].name });

    // Add users to firstChannel if they don't already exist
    if (firstChannel) {
        for (let user of users) {
            if (firstChannel.users.indexOf(user.id) === -1) {
                firstChannel.users.push(user.id);
            }
        }
        await firstChannel.save();
        await createTestMessages();
        console.log('channelId',firstChannel.id)
    }

    // Add the first user to secondChannel if they don't already exist
    if (secondChannel) {
        for(let i=0;i<2;i++){
            let user = users[i]
            if(user&&secondChannel.users.indexOf(user.id) === -1){
                secondChannel.users.push(user.id)
            }
        }
        await secondChannel.save();
    }
}

async function createTestMessages() {
    Msg.collection.drop();
    // const channels = await channel.find().populate('users');
    await Msg.init(); // Initialize the Message model
    // const msg = new Msg({
    //     content:"hello",
    //     sendUser,
    //     channel:channel.id
    // })
    // await msg.save();
    // channel.msgs.push(msg.id);
    // await channel.save();
    // console.log("Test data created successfully!")
    

}

export async function createTestDatas(){
    //clear all tables

    await createTestUsers();
    await createTestChannels();
  
}
