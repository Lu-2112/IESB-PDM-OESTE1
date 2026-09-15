import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable
            style={styles.textArea}
            onPress={() => onToggle(item.id)}
            android_ripple={{ color: '#e0e0e0' }}
          >
            <Text
              style={[
                styles.texto,
                item.concluida && styles.textoConcluido,
              ]}
            >
              {item.texto}
            </Text>
            <Text style={styles.data}>
              {new Date(item.criadaEm).toLocaleDateString()}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onDelete(item.id)}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deleteButtonPressed,
            ]}
            android_ripple={{ color: '#ffffff55' }}
          >
            <Text style={styles.deleteButtonText}>Remover</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 24,
  },
  empty: {
    marginTop: 48,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9a9aa2',
    fontSize: 15,
    fontWeight: '500',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ececf0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  textArea: {
    flex: 1,
  },
  texto: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#a8a8b0',
    fontWeight: '400',
  },
  data: {
    fontSize: 12,
    color: '#a8a8b0',
    marginTop: 3,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteButtonPressed: {
    opacity: 0.85,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});