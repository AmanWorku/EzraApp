import React from 'react';
import PropTypes from 'prop-types';
import {EthDateTime} from 'ethiopian-calendar-date-converter';
import {Text, View} from 'react-native';
import tw from './../../../tailwind';
import {useSelector} from 'react-redux';

const DateConverter = ({gregorianDate, textStyle}) => {
  const darkMode = useSelector(state => state.ui.darkMode);
  const [day, month, year] = gregorianDate.split('/').map(Number);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return <Text>Invalid date format: {gregorianDate}</Text>;
  }
  const ethDateTime = EthDateTime.fromEuropeanDate(
    new Date(year, month - 1, day),
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
    'ጳጉሚ',
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
};

export default DateConverter;
