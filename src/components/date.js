import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-datepicker';

var today = new Date();

var date =
  today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

const dateComponenst = (birthday, callback) => {
  return (
    <DatePicker
      style={{ width: '60%' }}
      date={birthday}
      mode="date"
      placeholder="select date"
      format="DD-MM-YYYY"
      minDate="01-01-1970"
      maxDate={birthday}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'relative',
          left: 0,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 36,
        },
        // ... You can check the source to find the other keys.
      }}
      onDateChange={date => callback(date)}
    />
  );
};

export default dateComponenst;
