import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { COLORS, SCALE, SIZES } from '../../constants';

type InputType = 'text' | 'password' | 'number';

interface InputProps {
  label?: string;
  onUpdateValue: (text: string) => void;
  value: string;
  isError?: boolean;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  testID?: string;
  onShowPassword?: () => void;
  type?: InputType;
}

const Input = ({
  label,
  placeholder = 'type...',
  keyboardType = 'default',
  secure = false,
  onUpdateValue,
  value,
  isError = false,
  testID,
  onShowPassword,
  type = 'text',
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={[styles.label, isError && styles.errorLabel]}>{label}</Text>}
      <View style={styles.inputBox}>
        <TextInput
          testID={testID}
          style={[styles.input, isError && styles.errorLabel]}
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
          placeholder={placeholder}
          cursorColor={COLORS.darkGray}
          selectionColor={COLORS.darkGray}
          underlineColorAndroid="transparent"
        />
        {type == 'password' ? (
          <Ionicons
            name={secure ? 'eye' : 'eye-off'}
            style={styles.clearIcon}
            onPress={onShowPassword}
          />
        ) : (
          value && (
            <AntDesign
              testID="close"
              name="close"
              style={styles.clearIcon}
              onPress={() => onUpdateValue('')}
            />
          )
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  clearIcon: {
    color: COLORS.darkGray,
    fontSize: SIZES.f16,
  },
  errorLabel: {
    color: COLORS.error100,
  },
  input: {
    flex: 1,
    fontSize: SIZES.f16,
  },
  inputBox: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkGray,
    borderRadius: SIZES.r10,
    borderWidth: SCALE(0.75),
    flexDirection: 'row',
    height: SIZES.s48,
    marginVertical: SIZES.m8,
    paddingHorizontal: SIZES.m10,
    width: '100%',
  },
  inputContainer: {
    marginVertical: SIZES.m4,
    width: '100%',
  },
  label: {
    color: COLORS.black,
    fontSize: SIZES.f16,
    marginBottom: SIZES.m4,
  },
});
