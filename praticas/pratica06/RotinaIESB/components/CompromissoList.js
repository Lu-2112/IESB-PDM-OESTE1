import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>{tituloLista}</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
            android_ripple={{ color: '#ffcccc' }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.itemText}>{item.texto}</Text>
            <Text style={styles.deleteText}>Excluir</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{listaVazia}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    marginBottom: 8,
  },
  itemPressed: {
    backgroundColor: '#ffe6e6',
  },
  itemText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});