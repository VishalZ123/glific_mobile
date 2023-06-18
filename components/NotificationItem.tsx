import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
type notificationType = {
  header: string;
  message: string;
  time: string;
  type: string;
};
const windowWidth = Dimensions.get('window').width;
const NotificationItem = (props: { notification: notificationType }) => {
  const { notification } = props;
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {notification.type === 'Info' ? (
          <View style={styles.info}>
            <MaterialCommunityIcons name="message-text-outline" size={24} color="#218AFF" />
          </View>
        ) : (
          <>
            {notification.type === 'Critical' ? (
              <View style={styles.critical}>
                <AntDesign name="setting" size={24} color="#767672" />
              </View>
            ) : (
              <View style={styles.warning}>
                <AntDesign name="warning" size={24} color="#DD1F1F" />
              </View>
            )}
          </>
        )}
      </View>
      <View style={styles.container2}>
        <Text style={styles.header}>{notification.header}</Text>
        <Text numberOfLines={3}>{notification.message}</Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>
    </View>
  );
};

export default NotificationItem;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 116,
  },
  container2: {
    width: windowWidth - 100,
  },
  critical: {
    alignItems: 'center',
    backgroundColor: COLORS.criticalBackground,
    borderColor: COLORS.criticalBorder,
    borderRadius: 25,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  header: {
    color: COLORS.black,
    fontWeight: '700',
  },
  imgContainer: {
    margin: 20,
  },
  info: {
    alignItems: 'center',
    backgroundColor: COLORS.infoBackground,
    borderColor: COLORS.infoBorder,
    borderRadius: 25,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  time: {
    color: COLORS.primary70,
    fontWeight: '700',
  },
  warning: {
    alignItems: 'center',
    backgroundColor: COLORS.warningBackground,
    borderColor: COLORS.warningBorder,
    borderRadius: 25,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
});
