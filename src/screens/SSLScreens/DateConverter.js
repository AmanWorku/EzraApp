import PropTypes from 'prop-types';
import {EthDateTime} from 'ethiopian-calendar-date-converter';
import {View} from 'react-native';
import {Text} from 'react-native-svg';

const DateConverter = ({gregorianDate}) => {
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
    <View>
      <Text>
        {ethiopianMonthName} {ethDateTime.date}
      </Text>
    </View>
  );
};

DateConverter.propTypes = {
  gregorianDate: PropTypes.string.isRequired,
};

export default DateConverter;
