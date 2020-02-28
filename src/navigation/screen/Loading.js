// import React from 'react';
// import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
// import auth from '@react-native-firebase/auth';

// export default class Loading extends React.Component {
//   render() {
//     // auth().onAuthStateChanged(user => {
//     //   this.props.navigation.navigate(user ? 'Listfriend' : 'Login');
//     // });
//     auth().onAuthStateChanged(users => {
//       this.props.navigation.navigate(users ? 'Listfriend' : 'Login');
//     });

//     return (
//       <View style={styles.container}>
//         <Text>Loading</Text>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
