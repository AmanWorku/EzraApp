import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput, Modal} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ArrowCircleRight, Bell} from 'phosphor-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from './../../../tailwind';
import {useSelector} from 'react-redux';

const NotificationSettings = () => {
  const [notificationTime, setNotificationTime] = useState({
    hour: '06',
    minute: '00',
    period: 'AM',
  }); // Default to 6:00 AM
  const [isModalVisible, setIsModalVisible] = useState(false);
  const darkMode = useSelector(state => state.ui.darkMode);

  useEffect(() => {
    // Load saved notification time from AsyncStorage
    const loadNotificationTime = async () => {
      const savedTime = await AsyncStorage.getItem('notificationTime');
      if (savedTime) {
        const [hour, minute] = savedTime.split(':');
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        setNotificationTime({
          hour: formattedHour.toString().padStart(2, '0'),
          minute,
          period,
        });
      }
    };
    loadNotificationTime();
  }, []);

  const saveNotificationTime = async () => {
    let {hour, minute, period} = notificationTime;
    hour = parseInt(hour, 10);
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    await AsyncStorage.setItem(
      'notificationTime',
      `${hour.toString().padStart(2, '0')}:${minute}`,
    );
    setIsModalVisible(false);
  };

  const handleInputChange = (field, value) => {
    setNotificationTime(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Function to format time in 12-hour format
  const formatTime = (hour, minute, period) => {
    return `${hour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={tw`flex-row justify-between`}>
        <View style={tw`flex-row items-center`}>
          <Bell size={18} weight="fill" color={'#EA9215'} style={tw`mr-2`} />
          <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
            Notification Time:{' '}
            {formatTime(
              notificationTime.hour,
              notificationTime.minute,
              notificationTime.period,
            )}
          </Text>
        </View>
        <ArrowCircleRight
          size={24}
          weight="fill"
          color={'#EA9215'}
          style={tw`mr-2`}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View
            style={[
              tw`p-6 rounded-lg w-80`,
              darkMode ? tw`bg-secondary-9` : tw`bg-white`,
            ]}>
            <Text
              style={tw`font-nokia-bold text-lg mb-4 text-center text-accent-6`}>
              Set Notification Time
            </Text>
            <View style={tw`items-center`}>
              <View style={tw`flex flex-row justify-center gap-2 items-center`}>
                <TextInput
                  style={[
                    tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold mb-2 text-center`,
                    darkMode ? tw`text-primary-1` : tw`text-secondary-6`,
                  ]}
                  placeholder="HH"
                  value={notificationTime.hour}
                  onChangeText={value => handleInputChange('hour', value)}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor={darkMode ? '#898989' : '#AAB0B4'}
                />
                <Text
                  style={tw`font-nokia-bold text-2xl text-accent-6 text-center`}>
                  :
                </Text>
                <TextInput
                  style={[
                    tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold mb-4 text-center`,
                    darkMode ? tw`text-primary-1` : tw`text-secondary-6`,
                  ]}
                  placeholder="MM"
                  value={notificationTime.minute}
                  onChangeText={value => handleInputChange('minute', value)}
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor={darkMode ? '#898989' : '#AAB0B4'}
                />
                <Picker
                  selectedValue={notificationTime.period}
                  style={[
                    tw`border border-primary-7 rounded px-4 py-2 font-nokia-bold mb-4`,
                    darkMode ? tw`text-primary-1` : tw`text-secondary-6`,
                  ]}
                  onValueChange={value => handleInputChange('period', value)}>
                  <Picker.Item label="AM" value="AM" />
                  <Picker.Item label="PM" value="PM" />
                </Picker>
              </View>
            </View>
            <View style={tw`items-center`}>
              <View
                style={tw`flex flex-row justify-between items-center gap-2`}>
                <TouchableOpacity onPress={saveNotificationTime}>
                  <Text style={tw`font-nokia-bold text-accent-6 text-sm`}>
                    Save
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Text style={tw`font-nokia-bold text-red-500 text-sm`}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NotificationSettings;
