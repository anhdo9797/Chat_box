import React, {Component} from 'react';
import database from '@react-native-firebase/database';

export const sendMessage = (nameRoom, messages) => {
  messages.forEach(e => {
    const message = {
      text: e.text,
      timestamp: database.ServerValue.TIMESTAMP,
      user: e.user,
    };

    database()
      .ref(`/ChatRoom/${nameRoom}/Messages`)
      .push(message);
  });
};

export const onMesssageUpdated = async (nameRoom, callback = () => {}) => {
  database()
    .ref(`/ChatRoom/${nameRoom}/Messages`)
    .limitToLast(20)
    .on('child_added', snapshot => {
      let rawData = snapshot.val();
      let _id = snapshot.key;

      let user = rawData.user;
      const createdAt = new Date(rawData.timestamp);

      let message = {...rawData, user, _id, createdAt};

      callback(message);
    });
};

export const offMesssageUpdated = nameRoom => {
  database()
    .ref(`/ChatRoom/${nameRoom}/Messages`)
    .off('child_added');
};
