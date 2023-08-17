import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign, Foundation, Ionicons } from '@expo/vector-icons';

import { COLORS, SIZES } from '../../constants';

interface Props {
  name: string;
  type: string;
  remove: () => void;
}

const AttachmentSelected = ({ name, type, remove }: Props) => {
  let icon;
  switch (type) {
    case 'image':
      icon = <Ionicons testID="image" name="image-outline" style={styles.attachmentIcon} />;
      break;
    case 'document':
      icon = (
        <Ionicons testID="document" name="document-attach-outline" style={styles.attachmentIcon} />
      );
      break;
    case 'location':
      icon = <Ionicons testID="location" name="location-outline" style={styles.attachmentIcon} />;
      break;
    case 'video':
      icon = <Ionicons testID="video" name="videocam-outline" style={styles.attachmentIcon} />;
      break;
    case 'audio':
      icon = <Foundation testID="audio" name="sound" style={styles.attachmentIcon} />;
      break;
    case 'recording':
      icon = <Ionicons testID="recording" name="mic-outline" style={styles.attachmentIcon} />;
      break;
  }
  return (
    <View testID="selectedAttachmentTab" style={styles.attachment}>
      <View style={styles.flexView}>
        {icon}
        <Text testID="attachmentURL" style={styles.attachmentText}>
          {name.slice(0, 30)}
        </Text>
      </View>
      <AntDesign testID="removeAttachment" name="close" style={styles.clearIcon} onPress={remove} />
    </View>
  );
};

export default AttachmentSelected;

const styles = StyleSheet.create({
  attachment: {
    alignItems: 'center',
    backgroundColor: COLORS.primary10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.m10,
  },
  attachmentIcon: {
    color: COLORS.primary400,
    fontSize: SIZES.m24,
  },
  attachmentText: {
    color: COLORS.primary70,
    fontSize: SIZES.f14,
    fontWeight: '500',
    marginLeft: SIZES.m10,
  },
  clearIcon: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    marginRight: SIZES.m10,
  },
  flexView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
