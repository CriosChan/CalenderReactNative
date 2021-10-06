import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, ScrollView } from 'react-native';

// System de reformation chiffre vers mot
const ReformatMonth = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
const ActualMonth = new Date().getMonth();
const ActualYear = new Date().getFullYear();

var scrollmonth = null;

const TestRN = () => {
  scrollmonth = React.useRef(null);
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
      <ScrollView ref={scrollmonth}>
        <SafeAreaView style={{flexDirection: 'column'}}>
          {/*Importation des mois*/}
          {MonthCalender(0)}
          {MonthCalender(1)}
          {MonthCalender(2)}
          {MonthCalender(3)}
          {MonthCalender(4)}
          {MonthCalender(5)}
          {MonthCalender(6)}
          {MonthCalender(7)}
          {MonthCalender(8)}
          {MonthCalender(9)}
          {MonthCalender(10)}
          {MonthCalender(11)}
          {ScollChange()}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

const ScollChange = () => {
  scrollmonth.current?.scrollTo({
    y: 250*ActualMonth,
  });
  return;
}

const MonthCalender = (monthnomber = ActualMonth) => {
  // Premier jour du mois selectionne
  var date = new Date(ActualYear, monthnomber, 1);
  // Récupération du jours de la semaine
  var day = date.getDay();
  // Dernier jour du mois selectionne
  var lastday = new Date(ActualYear, monthnomber + 1, 0).getDate();
  // Date du jour
  var today = new Date();

  let toreturn = [];
  let firstresult;
  // Boucle de calcul d'emplacement
  for(var i = 1; i <= parseInt(lastday); i++){

    if(i == 1){
      toreturn[day] = i;
      firstresult = day;
    }
    toreturn[firstresult] = i;
    firstresult++;
  }

  let finalresult = [];
  for(var i = 1 ; i <= 7; i++){
    let tempfinal = [];
    for(var y = 0 ; y <= 6; y++){
      let calcSearch = i + y * 7;
      if(toreturn[calcSearch] == today.getDate() && monthnomber == today.getMonth()){
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
    <SafeAreaView>
      <Text style={styles.textWhite}>{ReformatMonth[monthnomber]}</Text>
      <SafeAreaView style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
        {finalresult}
      </SafeAreaView>
    </SafeAreaView>
  );
}

// Créacteur de texte
const Days = (text = '', bg = '') => {
  // Surlignage du jour si égal à aujourd'hui
  if(bg == 'true'){
    return (<Text style={styles.today}>{text}</Text>);
  }
  return (<Text style={styles.days}>{text}</Text>);
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
