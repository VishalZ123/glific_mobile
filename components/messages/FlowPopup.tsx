import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, ToastAndroid, Platform, Alert } from 'react-native';
import { COLORS, SCALE } from '../../constants/theme';
import { Picker } from '@react-native-picker/picker';
import { GET_ALL_FLOWS, START_CONTACT_FLOW } from '../../graphql/queries/Flows';
import { useMutation, useQuery } from '@apollo/client';
import Button from '../ui/Button';

interface FlowProps {
  contactId: string;
  visible: boolean;
  onClose: () => void;
}
const PopupModal: React.FC<FlowProps> = ({ contactId, visible, onClose }) => {
  const [selectedFlow, setSelectedFlow] = useState('');
  const [startFlowMutation] = useMutation(START_CONTACT_FLOW);
  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  };
  const handleStartFlow = async () => {
    try {
      const { data } = await startFlowMutation({
        variables: {
          flowId: selectedFlow,
          contactId: contactId,
        },
      });

      // Show toast message here
      showToast('Flow started successfully!');

      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  const variables = {
    filter: {
      status: 'published',
      isActive: true,
    },
    opts: {
      limit: null,
      offset: 0,
      order: 'ASC',
    },
  };

  const { error, data } = useQuery(GET_ALL_FLOWS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
  if (error) {
    console.log(error);
  }
  interface FlowProp {
    [key: string]: string;
  }
  const flowsDict: FlowProp = {};
  if (data) {
    data['flows'].map((item: FlowProp) => {
      const { name, id } = item;
      flowsDict[name] = id;
    });
  }
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.background}>
        <View style={styles.popupContainer}>
          <Text style={styles.header}>Select Flow</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedFlow}
              onValueChange={(itemValue) => setSelectedFlow(itemValue)}
              mode="dropdown"
              prompt="Select a Flow"
            >
              <Picker.Item label="Select a Flow" value="" />
              {Object.entries(flowsDict).map(([name, value]) => (
                <Picker.Item key={value} label={name} value={value} />
              ))}
            </Picker>
            <Text style={styles.description}>
              The contact will be responded as per the messages planned in the flow.
            </Text>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button type="neutral" onPress={onClose}>
                  <Text>CANCEL</Text>
                </Button>
              </View>
              <View style={styles.button}>
                <Button onPress={handleStartFlow}>
                  <Text>START</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    backgroundColor: COLORS.black087,
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: 40,
    marginHorizontal: 10,
    marginTop: 24,
    width: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  description: {
    color: COLORS.black,
    marginTop: 14,
  },
  header: {
    fontSize: 17,
    fontWeight: '500',
  },
  picker: {
    borderColor: COLORS.black,
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
    marginBottom: 14,
    marginTop: 24,
    width: 270,
  },
  popupContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 270,
    paddingHorizontal: SCALE(30),
    paddingVertical: SCALE(40),
    width: 330,
  },
});
