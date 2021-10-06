import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, ScrollView, FlatList, setState } from 'react-native';

// System de reformation chiffre vers mot
const ReformatMonth = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
const ActualMonth = new Date().getMonth();
const ActualYear = new Date().getFullYear();

var scrollmonth = null;

var DefaultMonth = ActualMonth;
var DefaultYear = ActualYear;

var initialData = [
  {id: '0', month: DefaultMonth-2, year: DefaultYear},
  {id: '1', month: DefaultMonth-1, year: DefaultYear},
  {id: '2', month: DefaultMonth, year: DefaultYear},
  {id: '3', month: DefaultMonth+1, year: DefaultYear},
  {id: '4', month: DefaultMonth+2, year: DefaultYear},
];

const TestRN = () => {
  scrollmonth = React.useRef(null);
  const [data, setDataState] = useState(initialData);
  const generateData = () => {
    if(DefaultMonth >= 10){
      DefaultMonth = 0;
      DefaultYear ++;
      var initialData = [
        {id: '0', month: DefaultMonth+10, year: DefaultYear-1},
        {id: '1', month: DefaultMonth+11, year: DefaultYear-1},
        {id: '2', month: DefaultMonth, year: DefaultYear},
        {id: '3', month: DefaultMonth+1, year: DefaultYear},
        {id: '4', month: DefaultMonth+2, year: DefaultYear},
      ]
    } else {
      var initialData = [
        {id: '0', month: DefaultMonth-2, year: DefaultYear},
        {id: '1', month: DefaultMonth-1, year: DefaultYear},
        {id: '2', month: DefaultMonth, year: DefaultYear},
        {id: '3', month: DefaultMonth+1, year: DefaultYear},
        {id: '4', month: DefaultMonth+2, year: DefaultYear},
      ]
    }

    setDataState(initialData)
  }

  return (
    <SafeAreaView style={styles.container}>
    {/*START TOP LINE*/}
      <SafeAreaView style={styles.innerContainer}>
        <SafeAreaView style={styles.monthContainer}>
          <TouchableOpacity style={{marginLeft: 13, marginRight: 13}}>
            <Text style={styles.buttons}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{marginLeft:13}, styles.textRed}>{ActualYear}</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <TouchableOpacity flexDirection='right' style={{marginRight: 13}}>
          <Text style={styles.buttons}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {/*STOP TOP LINE*/}
      <SafeAreaView style={{flexDirection: 'row', justifyContent: 'center'}}>
      {/* Lettres en haut*/}
        {DaysText('L')}
        {DaysText('M')}
        {DaysText('M')}
        {DaysText('J')}
        {DaysText('V')}
        {DaysText('S')}
        {DaysText('D')}
      </SafeAreaView>
      <FlatList
      ref={scrollmonth}
      data={data}
      renderItem={Item}
      keyExtractor={item => item.id}
      onEndReached={() => {
        DefaultMonth += 2;
        generateData();
        ScrollChange();
      }}
      />
    </SafeAreaView>
  );
}

const Item = ({item, index}) => {
  return (
    MonthCalender(item.month, item.year)
  );
}

const ScrollChange = (Index = null) => {
  scrollmonth.current?.scrollToOffset({
    Offset: 500,
  });
  return;
}

const MonthCalender = (monthnomber = ActualMonth, yearnomber = ActualYear) => {
  // Premier jour du mois selectionne
  var date = new Date(yearnomber, monthnomber, 1);
  // Récupération du jours de la semaine
  var day = date.getDay();
  // Dernier jour du mois selectionne
  var lastday = new Date(yearnomber, monthnomber + 1, 0).getDate();
  // Date du jour
  var today = new Date();

  let toreturn = [];
  let firstresult;

  // Boucle de calcul d'emplacement
  for(var i = 1; i <= parseInt(lastday); i++){
    if(i == 1){
      if(day == 0){
        toreturn[7] = i;
        firstresult = 7;
      } else {
        toreturn[day] = i;
        firstresult = day;
      }
    }
    toreturn[firstresult] = i;
    firstresult++;
  }

  let finalresult = [];
  for(var i = 1 ; i <= 7; i++){
    let tempfinal = [];
    for(var y = 0 ; y <= 6; y++){
      let calcSearch = i + y * 7;
      if(y == 6 && toreturn[calcSearch] == null) break;
      if(toreturn[calcSearch] == today.getDate() && monthnomber == ActualMonth && yearnomber == ActualYear){
        tempfinal.push(Days(toreturn[calcSearch], 'true'));
      } else {
        tempfinal.push(Days(toreturn[calcSearch]));
      }
    }
    finalresult.push(
      <SafeAreaView style={styles.DayContainer}>
        {tempfinal}
      </SafeAreaView>
    );
  }
  // Interface d'un mois
  return (
    <View>
      <Text style={styles.textWhite}>{ReformatMonth[monthnomber]}</Text>
      <SafeAreaView style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
        {finalresult}
      </SafeAreaView>
    </View>
  );
}

var keyCount = 0;
const getKey = () => {
    return keyCount++;
}
// Créacteur de texte
const Days = (text = '', bg = '') => {
  // Surlignage du jour si égal à aujourd'hui
  if(bg == 'true'){
    return (<Text key={getKey()} style={styles.today}>{text}</Text>);
  }
  return (<Text key={getKey()} style={styles.days}>{text}</Text>);
}

const DaysText = (text = '') => {
  return (<Text style={styles.daysText}>{text}</Text>);
}

// Styles
const styles = StyleSheet.create({
    container:{
      backgroundColor: "black",
      justifyContent: "flex-start",
      flex: 1
    },
    innerContainer:{
      width: "100%",
      flexDirection: 'row',
      justifyContent: "space-between",
      backgroundColor: "#2E2E2E"
    },
    monthContainer:{
      height: "100%",
      flexDirection: 'row',
      alignItems: 'center'
    },
    DayContainer:{
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 5
    },
    buttons:{
      color: '#FF0032',
      fontSize: 30
    },
    days:{
      padding: 0,
      textAlign: 'center',
      color: 'white',
      fontSize: 25
    },
    today:{
      padding: 0,
      textAlign: 'center',
      color: 'white',
      fontSize: 25,
      backgroundColor: '#FF0032',
      borderRadius: 100
    },
    daysText:{
      padding: 12,
      color: 'white',
      fontSize: 25
    },
    textRed:{
      color: '#FF0032',
      fontSize: 20
    },
    textWhite:{
      marginLeft: 45,
      color: 'white',
      fontSize: 20
    }
  });

export default TestRN;
