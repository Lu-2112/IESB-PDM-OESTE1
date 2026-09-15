import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';


export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma nova meta de estudo..."
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />

      <Pressable
        onPress={onAdd}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        android_ripple={{ color: '#ffffff55' }}
      >
        <Text style={styles.buttonText}>+ Adicionar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dcdce2',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#ec4899',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});