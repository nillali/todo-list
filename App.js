import React, {useState ,useEffect} from 'react';
import { 
  FlatList, 
  View, 
  StyleSheet, 
  Text, 
  TextInput, 
  Pressable,
 } from 'react-native';
import { keyExtractor } from 'react-native/Libraries/Lists/VirtualizeUtils';



export default function App() {
  
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [progressData, setProgressData] = useState([]);
  const [showHide, setShowHide] = useState(false);

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
      

      if (showHide === false) {
        setShowHide(true);
      }
      console.log(progressData);

    }

    const handleToggle = () => {
      if (showHide === false) {
        setShowHide(true);
      } 
    }
      
      return (
        <View style={styles.container}>
      <View style={styles.container2}>
          <Text style={styles.heading}>TODO-LIST</Text>
          <TextInput placeholder="Sök efter karaktärer" style ={styles.inputField}
          onChangeText={text => setTextInputValue(text)}
          value={textInputValue}
          >
          </TextInput>

          <View style={styles.categories}>
          <View style={styles.categories1}>
            <Text style={styles.categoriesHeadline}>Karaktärer</Text>
            <View style={styles.names}>
                <FlatList
                data={searchCharacter}
                keyExtractor={item => item.char_id}
                renderItem={({ item }) => (
                <Pressable
                onPress={ () => moveToProgress(item.name)}>
                <Text style={{
                  // display: showHide,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: 40,
                  }}>{item.name}</Text>
                  </Pressable>
                  )}
                />
           </View>
          </View>
          <View style={styles.categories2}>
            <Text style={styles.categoriesHeadline}>Planerat</Text>
            <FlatList
            data={progressData}
            keyExtractor={Math.random}
            renderItem={({ item }) => (
              <Pressable><Text style={{fontWeight: 'bold',}}>{item.name}</Text></Pressable>
            )}
            >
              
            </FlatList>
          </View>
          <View style={styles.categories3}>
            <Text style={styles.categoriesHeadline}>Träffat</Text>
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
    height: 30,
    width: 180, 
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
    width: '35%',
    marginLeft: 10,
  },
  categories2:{
    width: '32%',
  },
  categories3:{
    width: '32%',
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
    names: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 20,
    }
  });
  
  {/* <ItemRender id={item.char_id} name={item.name} />
  <Pressable style={styles.doneButton} onPress={() => console.log('Button pressed')}>
  <Text style={{alignSelf: 'center'}}>Träffat</Text>
</Pressable> */}

{/*const ItemRender = ({id}) => (
//   <View>
//     <Pressable style={{
//       display: showHide, 
//       backgroundColor: '#dc9d70',
//       justifyContent: 'center',
//       width: 65,
//       height: 30,
//       borderWidth: 1,
//       borderColor: "#20232a",
//       borderRadius: 10,
//       marginBottom: 10,
//       }} onPress={handleToggle}>
//             <Text style={{alignSelf: 'center'}}>Planerat</Text>
//     </Pressable>
//   </View>

*/ }