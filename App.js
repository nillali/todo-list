import React, {useState ,useEffect} from 'react';
import { FlatList, View, StyleSheet, Text, TextInput, Pressable, } from 'react-native';
import { keyExtractor } from 'react-native/Libraries/Lists/VirtualizeUtils';



export default function App() {


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  console.log(data);


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
    
    const deleteButton = (index) => {
      const newList = data.filter((item, i) => i+1 != index)
      setData(newList)
    }

    const ItemRender = ({id}) => (
      <View>
        <Pressable style={styles.processButton} onPress={() => {deleteButton (id)}}>
                <Text style={{alignSelf: 'center'}}>Planerat</Text>
        </Pressable>
      </View>
    )

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
          <Text style={styles.heading}>TODO-LIST</Text>
          <TextInput placeholder="Sök efter karaktärer" style ={styles.inputField}
          onChangeText={text => setTextInputValue(text)}
          value={textInputValue}
          >
          </TextInput>
          <Pressable style={styles.searchButton} onPress={() => console.log({searchCharacter})}>
          <Text style={{alignSelf: 'center'}}>Sök</Text>
          </Pressable>
          <View style={styles.categories}>
            <Pressable><Text style={styles.categoriesHeadline}>Karaktärer</Text></Pressable>
            <Pressable><Text style={styles.categoriesHeadline}>Planerat</Text></Pressable>
            <Pressable><Text style={styles.categoriesHeadline}>Träffat</Text></Pressable>
          </View>

          <View style={{ flex: 3, padding: 40 }}>
      {isLoading ? <Text>Laddar innehåll...</Text> : 
      ( 
      <View>
          <FlatList
            data={data}
            keyExtractor={item => item.char_id}
            renderItem={({ item }) => (
              <View style={styles.names}>
                
              <Text style={{fontWeight: 'bold', marginLeft: 9, marginTop: 7,}}>{item.name}</Text>
              <ItemRender id={item.char_id} name={item.name} />
              {/* <Text>{item.portrayed}</Text> */}
              {/* <Pressable style={styles.processButton} onPress={() => {deleteButton (item.char_id)}}>
                <Text style={{alignSelf: 'center'}}>Planerat</Text>
                </Pressable> */}

              <Pressable style={styles.doneButton} onPress={() => console.log('Button pressed')}>
                <Text style={{alignSelf: 'center'}}>Träffat</Text>
                </Pressable>



              </View>
            )}
          />
        </View>
      )}
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
  },
  container2:{
    alignItems: 'center',
    width: 370, 
    backgroundColor: 'white', 
    marginTop: 60,
    paddingBottom: 20,
    
  },
  heading: {
    color: '#000',
    fontSize: 40,
    fontWeight: '600',
    marginTop: 15,
  },
  categories: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly'

  },
  categoriesHeadline: {
    alignSelf: 'center',
    marginLeft: 30,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  inputField: {
    padding: 15,
    margin: 10,
    height: 30,
    width: 180, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
  searchButton: {
    justifyContent: 'center',
    width: 65,
    height: 30,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 10,
  },
  processButton:{
    backgroundColor: '#dc9d70',
    justifyContent: 'center',
    width: 65,
    height: 30,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 10,
    marginBottom: 10,
  },
  doneButton:{
    backgroundColor: '#90c269',
    justifyContent: 'center',
    width: 65,
    height: 30,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 10,
  },
  names: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 20,
  }
});
