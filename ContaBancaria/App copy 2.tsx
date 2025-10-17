import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Button, 
  Alert, 
  Switch 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function App() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [limite, setLimite] = useState(2500);
  const [estudante, setEstudante] = useState(false);
  const [dados, setDados] = useState<string | null>(null);

  // --- Validação completa ---
  const validar = (): boolean => {
    const nomeTrim = nome.trim();
    const idadeNum = Number(idade);

    if (!nomeTrim) {
      Alert.alert('Erro de validação', 'Por favor, digite seu nome.');
      return false;
    }

    if (!idade || isNaN(idadeNum)) {
      Alert.alert('Erro de validação', 'Digite uma idade válida (número).');
      return false;
    }

    if (idadeNum < 18) {
      Alert.alert('Erro de validação', 'Idade mínima para abrir conta é 18 anos.');
      return false;
    }

    if (!sexo) {
      Alert.alert('Erro de validação', 'Selecione o sexo.');
      return false;
    }

    return true;
  };

  const abrirConta = () => {
    if (!validar()) {
      return; 
    }

    const resumo = `
Nome: ${nome}
Idade: ${idade}
Sexo: ${sexo}
Limite: R$ ${limite.toFixed(2)}
Estudante: ${estudante ? 'Sim' : 'Não'}
    `;

    Alert.alert('Conta criada com sucesso!', resumo);

    setDados(resumo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Abrir Conta Bancária</Text>

      {/* Nome */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      {/* Idade */}
      <TextInput
        style={styles.input}
        placeholder="Digite sua idade"
        value={idade}
        keyboardType="numeric"
        onChangeText={setIdade}
      />

      {/* Sexo */}
      <Text style={styles.label}>Sexo:</Text>
      <Picker
        selectedValue={sexo}
        onValueChange={setSexo}
        style={styles.picker}
      >
        <Picker.Item label="Selecione..." value="" />
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Feminino" value="Feminino" />
        <Picker.Item label="Outro" value="Outro" />
      </Picker>

      {/* Limite */}
      <Text style={styles.label}>
        Limite da Conta: R$ {limite.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </Text>
      <Slider
        style={{ width: '90%', height: 40 }}
        minimumValue={500}
        maximumValue={10000}
        step={100}
        value={limite}
        onValueChange={setLimite}
        minimumTrackTintColor="#007bff"
        thumbTintColor="#007bff"
      />

      {/* Estudante */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Estudante:</Text>
        <Switch
          value={estudante}
          onValueChange={setEstudante}
          thumbColor={estudante ? '#007bff' : '#ccc'}
        />
      </View>

      {/* Botão */}
      <Button title="Abrir Conta" onPress={abrirConta} color="#007bff" />

      {/* Resultado */}
      {dados && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTitulo}>Resumo da Conta:</Text>
          <Text style={styles.resultadoTexto}>{dados}</Text>
        </View>
      )}
    </View>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  titulo: { fontSize: 26, textAlign: 'center', fontWeight: 'bold', marginBottom: 20 },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  label: { fontSize: 18, marginVertical: 8 },
  picker: { backgroundColor: '#fff' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  resultado: { marginTop: 20, backgroundColor: '#fff', padding: 15, borderRadius: 8 },
  resultadoTitulo: { fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
  resultadoTexto: { fontSize: 16, lineHeight: 22 },
});
