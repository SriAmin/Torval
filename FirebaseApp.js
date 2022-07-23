import firestore from '@react-native-firebase/firestore';

export default getThread = async () => {
    let forumThreads = []
    await firestore().collection("Threads").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            forumThreads.push(doc.data())
            //console.log(doc.id, " => ", doc.data());
        });
    })

    return forumThreads
}
