import React from 'react';
import PropTypes from 'prop-types';
import {EthDateTime} from 'ethiopian-calendar-date-converter';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import tw from './../../../tailwind'; // Ensure this path is correct

const DateConverter = ({gregorianDate, textStyle}) => {
  const darkMode = useSelector(state => state.ui.darkMode);

  // Split the date string and convert to numbers
  const [day, month, year] = gregorianDate.split('/').map(Number);

  // Check for invalid date format
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return <Text>Invalid date format: {gregorianDate}</Text>;
  }

  // Convert to Ethiopian date
  const ethDateTime = EthDateTime.fromEuropeanDate(
    new Date(year, month - 1, day + 1),
  );
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
    <Text style={tw`${textStyle}`}>
      {ethiopianMonthName} {ethDateTime.date}
    </Text>
  );
};

DateConverter.propTypes = {
  gregorianDate: PropTypes.string.isRequired,
  textStyle: PropTypes.string,
};

export default DateConverter;
