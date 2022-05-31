import React, {useState ,useEffect} from 'react';
import { 
  FlatList, 
  View, 
  StyleSheet, 
  Text, 
  TextInput, 
  Pressable,
 } from 'react-native';

export default function App() {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [progressData, setProgressData] = useState([]);
  const [doneData, setDonedata] = useState([]);

  useEffect(() => {
    fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    }, []);

    const searchCharacter = textInputValue ? data.filter((item)=>
    item.name.toLowerCase().includes(textInputValue.toLocaleLowerCase())
    )
    :data;

    const moveToProgress = (arg) => {
      setProgressData([...progressData, arg]);
      const tempData = [...data]
      const removeValue = arg
      const filterItems = tempData.filter(item=> item !== removeValue)
      setData(filterItems)
    }

    const moveToDone = (arg) => {
      setDonedata([...doneData, arg]);
      const tempData = [...progressData]
      const removeValue = arg
      const filterItems = tempData.filter(item=> item !== removeValue)
      setProgressData(filterItems)
    }

      
      return (
        <View style={styles.container}>
      <View style={styles.container2}>
          <Text style={styles.heading}>TODO-LIST</Text>
          <Text>Breaking Bad Karaktärer</Text>
          <TextInput placeholder="Sök efter karaktärer ...." style ={styles.inputField}
          onChangeText={text => setTextInputValue(text)}
          value={textInputValue}>
          </TextInput>

          <View style={styles.categories}>
          <View style={styles.categories1}>
            <Text style={styles.categoriesHeadline}>Karaktärer</Text>
            <View style={styles.names}>
                <FlatList
                data={searchCharacter}
                renderItem={({ item }) => (
                <Pressable
                onPress={ () => moveToProgress(item)}>
                <Text style={styles.characterNames}>{item.name}</Text>
                  </Pressable>
                  )}/>
           </View>
          </View>
          <View style={styles.categories2}>
            <Text style={styles.plannedHeadline}>Planerat</Text>
            <FlatList
            data={progressData}
            renderItem={({ item }) => (
              <Pressable
              onPress={ () => moveToDone(item)}>
                <Text style={styles.progressCharacterNames}>{item.name}</Text></Pressable>
              )}>
              
            </FlatList>
          </View>
          <View style={styles.categories3}>
            <Text style={styles.doneHeadline}>Träffat</Text>
            <FlatList
            data={doneData}
            renderItem={({ item }) => (
              <Pressable><Text style={styles.doneCharacterNames}>{item.name}</Text></Pressable>
            )}></FlatList>
              </View>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2c4a4',
    alignItems: 'center',
    paddingBottom: 70,
  },
  container2:{
    alignItems: 'center',
    width: 390, 
    backgroundColor: 'white', 
    marginTop: 55,
    paddingBottom: 50,
    
  },
  heading: {
    color: '#000',
    fontSize: 40,
    fontWeight: '600',
    marginTop: 15,
  },
  inputField: {
    padding: 15,
    margin: 25,
    height: 60,
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1,
    color: '#000'
  },
  categories: {
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
  },
  categories1:{
    width: '33%',
  },
  categories2:{
    width: '33%',
  },
  categories3:{
    width: '33%',
  },
  categoriesHeadline: {
    backgroundColor: '#f2f2f2',
    marginRight: 0,
    padding: 7,
    borderWidth: 1,
    borderColor: "#20232a",
    maxWidth: 100,
    alignSelf: 'center',
  },
  plannedHeadline: {
    backgroundColor: '#dc9d70',
    marginRight: 0,
    padding: 7,
    borderWidth: 1,
    borderColor: "#20232a",
    maxWidth: 100,
    alignSelf: 'center',
  },
  doneHeadline: {
    backgroundColor: '#90c269',
    marginRight: 0,
    padding: 7,
    borderWidth: 1,
    borderColor: "#20232a",
    maxWidth: 100,
    alignSelf: 'center',
  },
  characterNames: {
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 40,
  },
  progressCharacterNames:{
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 40,
    color: '#dc9d70',
  },
  doneCharacterNames: {
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 40,
    color: '#90c269',
  },
    names: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 20,
    }
  });