import React, {useState ,useEffect} from 'react';
import { FlatList, View, StyleSheet, Text, TextInput, Pressable } from 'react-native';


export default function App() {


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);


  useEffect(() => {
    fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    }, []);


  return (
    <View style={styles.container}>
      <View style={styles.container2}>
          <Text style={styles.heading}>TODO-LIST</Text>
          <TextInput placeholder="Sök efter skådespelare" style ={styles.inputField}>
          </TextInput>
          <Pressable style={styles.searchButton}>
          <Text>Sök</Text>
          </Pressable>
          <View style={styles.categories}>
            <Text style={styles.categoriesHeadline}>Skådespelare</Text>
            <Text style={styles.categoriesHeadline}>Planerat</Text>
            <Text style={styles.categoriesHeadline}>Träffat</Text>
          </View>

          <View style={{ flex: 3, padding: 40 }}>
      {isLoading ? <Text>Laddar...</Text> : 
      ( 
      <View>
          <FlatList
            data={data}
            keyExtractor={item => item.char_id}
            renderItem={({ item }) => (
              <View style={styles.names}>
              <Text style={{fontWeight: 'bold'}}>{item.name + ','}</Text>
              <Text>{item.portrayed}</Text>
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
    justifyContent: 'center'

  },
  categoriesHeadline: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  inputField: {
    padding: 15,
    margin: 10,
    height: 30,
    width: 190, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
  searchButton: {
    justifyContent: 'center',
    width: 55,
    height: 30,
    borderWidth: 1,
    borderColor: "#20232a",
    borderRadius: 10,
  },
  names: {
    marginBottom: 10,
  }
});
