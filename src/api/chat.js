import React, { Component } from 'react';
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

export const onMessage = async (nameRoom, messages) => {
  try {
    let messages = [];

    console.log(`/ChatRoom/${nameRoom}/Messages`);

    await database()
      .ref(`/ChatRoom/${nameRoom}/Messages`)
      .limitToLast(20)
      .on('child_added', snapshot => {
        let user = snapshot.val().user;
        user._id = user.uid;
        user.name = user.email;

        messages.push({
          text: snapshot.val().text,
          user,
          createdAt: snapshot.val().createdAt,
        });
      });

    return messages;
  } catch (error) {
    console.log('error', error);
  }
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

      let message = { ...rawData, user, _id, createdAt };

      callback(message);
    });
};

export const offMesssageUpdated = nameRoom => {
  database()
    .ref(`/ChatRoom/${nameRoom}/Messages`)
    .off('child_added');
};
