import { useLayoutEffect, useState } from 'react';
import {
  Alert, FlatList, KeyboardAvoidingView, Modal, Platform, Pressable,
  ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../constants/theme';
import { useAppTheme } from '../context/theme-context';
import { useExpenses } from '../store/expenses-context';

function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (values.date > endOfToday) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Escolha uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { colors } = useAppTheme();

  const [form, setForm] = useState(() => {
    const existing = expenses.find((e) => e.id === expenseId);
    return existing
      ? {
          description: existing.description,
          amount: String(existing.amount),
          date: new Date(existing.date),
          category: existing.category,
        }
      : { description: '', amount: '', date: new Date(), category: '' };
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleChange(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    // Se o campo já mostrava erro, revalida só ele (a mensagem some ao corrigir)
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(next)[field] }));
    }
  }

  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalized)) handleChange('amount', normalized);
  }

  function handleDelete() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  function handleSave() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };

    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
      headerRight: isEditing
        ? () => (
            <Pressable onPress={handleDelete} hitSlop={10}>
              <Ionicons name="trash-outline" size={24} color={colors.error} />
            </Pressable>
          )
        : undefined,
    });
  }, [navigation, isEditing, colors.error]);

  const inputStyle = (field) => [
    styles.input,
    { backgroundColor: colors.input, color: colors.text, borderColor: errors[field] ? colors.error : colors.border },
  ];

  const renderError = (field) =>
    errors[field] ? <Text style={[styles.error, { color: colors.error }]}>{errors[field]}</Text> : null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
        <TextInput
          style={inputStyle('description')}
          value={form.description}
          onChangeText={(t) => handleChange('description', t)}
          placeholder="Ex.: Almoço"
          placeholderTextColor={colors.textSecondary}
        />
        {renderError('description')}

        <Text style={[styles.label, { color: colors.text }]}>Valor (R$)</Text>
        <TextInput
          style={inputStyle('amount')}
          value={form.amount}
          onChangeText={handleAmountChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={colors.textSecondary}
        />
        {renderError('amount')}

        <Text style={[styles.label, { color: colors.text }]}>Data</Text>
        <Pressable style={inputStyle('date')} onPress={() => setShowPicker(true)}>
          <Text style={{ color: colors.text }}>{form.date.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {renderError('date')}

        {showPicker && (
          <DateTimePicker
            value={form.date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selected) => {
              if (Platform.OS !== 'ios') setShowPicker(false);
              if (selected) handleChange('date', selected);
            }}
          />
        )}
        {showPicker && Platform.OS === 'ios' && (
          <Pressable onPress={() => setShowPicker(false)}>
            <Text style={{ color: colors.primary, textAlign: 'right', marginTop: 4 }}>Concluir</Text>
          </Pressable>
        )}

        <Text style={[styles.label, { color: colors.text }]}>Categoria</Text>
        <Pressable style={inputStyle('category')} onPress={() => setShowModal(true)}>
          <Text style={{ color: form.category ? colors.text : colors.textSecondary }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        {renderError('category')}

        <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
      </ScrollView>

      <Modal transparent animationType="slide" visible={showModal} onRequestClose={() => setShowModal(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowModal(false)}>
          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <Text style={[styles.label, { color: colors.text }]}>Escolha a categoria</Text>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    handleChange('category', item);
                    setShowModal(false);
                  }}
                >
                  <Text style={{ color: colors.text, fontSize: 16 }}>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 48 },
  label: { fontSize: 15, fontWeight: '600', marginTop: 16, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 16 },
  error: { fontSize: 13, marginTop: 4 },
  button: { marginTop: 28, padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: { padding: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%' },
  option: { paddingVertical: 14 },
});