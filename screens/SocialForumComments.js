import React from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';

//This is used to conditional render the list if there are comments for the thread or if none exist at the moment
const CommentList = ({data}) => {
    if (data.length == 0)
        return <Text style={[{marginTop: 50, padding: 10,textAlign: "center", color: 'grey'}]}>Sorry, there are no comments for this thread yet, check back again later.</Text>
    else 
        return (
            <FlatList
                data={data}
                renderItem={({item}) => {
                    return (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{item.text}</Text>
                            <Text style={styles.itemAuthor}>{item.author}</Text>
                        </View>
                    )
                }}
            />
        )
}

const SocialForumComments = ({ navigation, route }) => {
    let thread = route.params.thread;
    return (
        <View style={styles.container}>
            <View style={[{borderBottomWidth: 1, marginBottom: 10, padding: 15}]}>
                <Text style={[{fontSize: 18}]}>{thread.title}</Text>
                <Text style={styles.threadAuthor}>{thread.author}</Text>
                <Text style={styles.threadTitle}>{thread.description}</Text>
            </View>
            <CommentList data={thread.comments} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    threadAuthor: {
        padding: 5,
        paddingBottom: 15,
        color: "grey",
        fontSize: 12,
    },
    threadTitle: {
        fontSize: 15,
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "grey",
    },
    itemTitle: {
        fontSize: 15,
    },
    itemAuthor: {
        fontSize: 10,
        padding: 10,
        color: "grey",
    },
})

export default SocialForumComments;