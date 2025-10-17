import React, { useState, useEffect } from 'react';
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
  const [isValid, setIsValid] = useState(false);

  // Validação automática sempre que os campos mudam
  useEffect(() => {
    const idadeNum = Number(idade);
    const valido = 
      nome.trim() !== '' &&
      !isNaN(idadeNum) &&
      idadeNum >= 18 &&
      sexo !== '';
    setIsValid(valido);
  }, [nome, idade, sexo]);

  // Validação com mensagens (só usada ao apertar o botão)
  const validar = (): boolean => {
    const idadeNum = Number(idade);

    if (!nome.trim()) {
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
    if (!validar()) return;

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

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua idade"
        value={idade}
        keyboardType="numeric"
        onChangeText={setIdade}
      />

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

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Estudante:</Text>
        <Switch
          value={estudante}
          onValueChange={setEstudante}
          thumbColor={estudante ? '#007bff' : '#ccc'}
        />
      </View>

      {/* Botão desabilitado quando houver erro */}
      <View style={styles.buttonContainer}>
        <Button
          title="Abrir Conta"
          onPress={abrirConta}
          color={isValid ? '#007bff' : '#999'}
          disabled={!isValid}
        />
        {!isValid && (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>
            Preencha todos os campos obrigatórios corretamente.
          </Text>
)}

      </View>

      {dados && (
        <View style={styles.resultado}>
          <Text style={styles.resultadoTitulo}>Resumo da Conta:</Text>
          <Text style={styles.resultadoTexto}>{dados}</Text>
        </View>
      )}
    </View>
  );
}

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
  buttonContainer: { marginTop: 10, marginBottom: 10 },
  resultado: { marginTop: 20, backgroundColor: '#fff', padding: 15, borderRadius: 8 },
  resultadoTitulo: { fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
  resultadoTexto: { fontSize: 16, lineHeight: 22 },
});
