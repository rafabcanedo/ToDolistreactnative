// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet,
  Text, 
  View,
  TextInput, 
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

// import AsyncStorage
import { AsyncStorage } from 'react-native';

// import keyboard para ele abaixar quando criamos uma Task
import { Keyboard } from "react-native"; // importamos aqui,pois ali no import de cima nao podia colocar {}

// import expo icons
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import Task from './components/Task'; <Task />

//////////////////////// CODE //////////////////////////
export default function App() {
  // Task onde fica nossas Tarefas, por isso é um array
  // NewTask onde fica salvo o nosso input
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Aqui fica todas as funções "extras" do app
  async function addTask() {
    
    if (newTask === "") {
      return;
    }

    const search = task.filter(task => task === newTask); // aqui verificamos se quando a Task for criada, ja não existe uma igual
    
    if (search.length !== 0) {
      Alert.alert("Atention", "Já existe uma Tarefa com este nome!");
      return;
    }
    setTask([ ... task ,newTask]);
    setNewTask('');

    Keyboard.dismiss(); // aqui fazemos que o teclado abaixe qnd escrevemos uma tarefa
  }

  async function removeTask(item) {
    Alert.alert(
      "Delete Task",
      "You´re sure delete Task?",
    [
    {
      Text: "Cancel",
      onPress: () => {
        return;
      },
      style: "cancel"
    },
    {
      text: "OK",
      onPress: () => setTask(task.filter(tasks => tasks !== item ))
    }
   ],
     { cancelable: false }
  );

  }

  useEffect(() => {
    async function loadingDate() {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    }
    loadingDate();
  }, []);

  // função para quando fechamos o app as Tasks ficam salvas
  useEffect(() => {
    async function saveDate() {
      AsyncStorage.setItem("task", JSON.stringify(task) )
    }
    saveDate();
  }, [task])

  /*
  // toda vez que newTask alterar ele vai dar o console.log
  useEffect(() => {
    console.log(newTask);
  }, [newTask]);
  */

  return (
    <>
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      behavior="padding"
      style={{ flex: 1 }}
      enabled={Platform.OS === "ios"}
    >
    <View style={styles.container}>
     <Text style={styles.sectionTitle}>Today´s Tasks</Text>
      <View style={styles.Body}>
       <FlatList 
       style={styles.FlatList}
       data={task}
       keyExtractor={item => item.toString()}// identificação por meio do KeyExtractor
       renderItem={({ item }) => (
         <View style={styles.ContainerView}>
           <Text style={styles.Texto}>{item}</Text>
           <TouchableOpacity onPress={() => removeTask(item)}>
             <MaterialIcons 
             name="delete-forever"
             size={25}
             color="#606493"
             />
           </TouchableOpacity>
         </View>
       )}
       />
      </View>
    <View style={styles.Form}>
       <TextInput 
       style={styles.Input} 
       placeholderTextColor="#999"
       autoCorrect={true}
       placeholder="Add a Task"
       maxLength={25}
       onChangeText={text => setNewTask(text)}
       value={newTask}
       />
       <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
         <Ionicons name="ios-add" size={25} color="#FFF"/>
       </TouchableOpacity>
    </View>
    </View>
    </KeyboardAvoidingView>
    </>
  );
}

//////////////////////////// Styles View //////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20
  },
  sectionTitle: {
   fontSize: 24,
   fontWeight: 'bold'
  },
  Body: {
    flex: 1,
  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#eee",
    // backgroundColor: "#777", // test color
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c6cce",
    borderRadius: 4,
    marginLeft: 10
  },
  FlatList: {
    flex: 1,
    marginTop: 5
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",

    display: "flex",
    flexDirection: "row",
    alignItems: "center", // centralizando os Tasks name
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#eee"
  },
  Texto: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center"
  }
});

// TouchableOpcity = Button na web

// <> </> para "fechar" as Views 

// {({ item }) => <Text>{item}</Text>}

/**
 * Condicional: *
   enabled={Platform.OS === "ios"} se a platforkm for IOS ele cria um "padding" no teclado 
 */

// setTask([ ... task ,newTask]) atribui tudo o que tinha no task + o newTask

/*
 * Limpando o vlaor do input(barra de escrever): *
  setNewTask('');
  value={newTask}
 */