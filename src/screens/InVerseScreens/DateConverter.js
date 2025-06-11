import React from 'react';
import PropTypes from 'prop-types';
import {EthDateTime} from 'ethiopian-calendar-date-converter';
import {Text} from 'react-native';
import tw from './../../../tailwind'; // Ensure this path is correct

const DateConverter = ({gregorianDate}) => {
  // Split the date string and convert to numbers
  const [day, month, year] = gregorianDate.split('/').map(Number);

  // Check for invalid date format
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return <Text>Invalid date format: {gregorianDate}</Text>;
  }

  // Adjust the date for the Ethiopian week transition
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();

  // If it's Saturday and past 6 PM, move to the next day
  if (dayOfWeek === 6) {
    const currentHour = new Date().getHours();
    if (currentHour >= 18) {
      date.setDate(date.getDate() + 1);
    }
  }

  // Convert to Ethiopian date
  const ethDateTime = EthDateTime.fromEuropeanDate(date);
  const ethiopianMonthNames = [
    'መስከረም',
    'ጥቅምት',
    'ህዳር',
    'ታህሳስ',
    'ጥር',
    'የካቲት',
    'መጋቢት',
    'ሚያዝያ',
    'ግንቦት',
    'ሰኔ',
    'ሐምሌ',
    'ነሃሴ',
    'ጳጉሜ', // 13th month
  ];

  const ethiopianMonthName = ethiopianMonthNames[ethDateTime.month - 1];

  return (
    <Text style={tw`font-nokia-bold text-accent-6`}>
      {ethiopianMonthName} {ethDateTime.date + 1}
    </Text>
  );
};

DateConverter.propTypes = {
  gregorianDate: PropTypes.string.isRequired,
  textStyle: PropTypes.string,
};

export default DateConverter;
