import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';

export async function listFriend(uid) {
  try {
    const array = [];
    await database()
      .ref(`/users/${uid}/friend`)
      .on('child_added', snapshot => {
        array.push({
          name: snapshot.val().email,
          key: snapshot.key,
        });
      });

    console.log('===array', array);
  } catch (e) {
    console.log('=== AddFriend error: ', e);
    throw e;
  }
}

// const flatList = uid => {
//   return (
//     <FlatList
//       data={listFriend(uid).array}
//       renderItem={item => {
//         <View>
//           <Text>{item.name}</Text>
//         </View>;
//       }}
//     />
//   );
// };

// export default flatList;
