import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';

// System de reformation chiffre vers mot
const ReformatMonth = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
const ActualMonth = new Date().getMonth();
const ActualYear = new Date().getFullYear();

const TestRN = () => {
  return (
    <View style={styles.container}>
    {/*START TOP LINE*/}
      <View style={styles.innerContainer}>
        <View style={styles.monthContainer}>
          <TouchableOpacity style={{marginLeft: 13, marginRight: 13}}>
            <Text style={styles.buttons}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{marginLeft:13}, styles.textRed}>{ActualYear}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity flexDirection='right' style={{marginRight: 13}}>
          <Text style={styles.buttons}>+</Text>
        </TouchableOpacity>
      </View>
      {/*STOP TOP LINE*/}
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      {/* Lettres en haut*/}
        {DaysText('L')}
        {DaysText('M')}
        {DaysText('M')}
        {DaysText('J')}
        {DaysText('V')}
        {DaysText('S')}
        {DaysText('D')}
      </View>
      <ScrollView>
        <View style={{flexDirection: 'column'}}>
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
        </View>
      </ScrollView>
    </View>
  );
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
  let bg = [];
  let firstresult;
  // Boucle de calcul d'emplacement
  for(var i = 1; i <= parseInt(lastday); i++){
    if(i == 1){
      // Verification de l'emplacement du permier jour du mois
      switch (parseInt(day)) {
        case 1:
          toreturn[0] = i;
          firstresult = 0;
          break;
        case 2 :
          toreturn[1] = i;
          firstresult = 1;
          break;
        case 3 :
          toreturn[2] = i;
          firstresult = 2;
          break;
        case 4 :
          toreturn[3] = i;
          firstresult = 3;
          break;
        case 5 :
          toreturn[4] = i;
          firstresult = 4;
          break;
        case 6 :
          toreturn[5] = i;
          firstresult = 5;
          break;
        case 0 :
          toreturn[6] = i;
          firstresult = 6;
          break;
      }
    } else {
      // Emplacement des chiffres
      toreturn[firstresult] = i;
    }
    // Verification du jour pour le surligner si il est égal à aujourd'hui
    if(i == today.getDate() && monthnomber == today.getMonth() && ActualYear == today.getFullYear()){
      bg[firstresult] = 'true';
    }

    firstresult++;
  }
  // Interface d'un mois
  return (
    <View>
      <Text style={styles.textWhite}>{ReformatMonth[monthnomber]}</Text>
        {line1(toreturn, bg)}
    </View>
  );
}

// Createur de calendrier
const line1 = (text = [], bg = []) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
      <View style={styles.DayContainer}>
        {Days(text[0], bg[0])}
        {Days(text[7], bg[7])}
        {Days(text[14], bg[14])}
        {Days(text[21], bg[21])}
        {Days(text[28], bg[28])}
        {Days(text[35], bg[35])}
      </View>
      <View style={styles.DayContainer}>
        {Days(text[1], bg[1])}
        {Days(text[8], bg[8])}
        {Days(text[15], bg[15])}
        {Days(text[22], bg[22])}
        {Days(text[29], bg[29])}
        {Days(text[36], bg[36])}
      </View>
      <View style={styles.DayContainer}>
        {Days(text[2], bg[2])}
        {Days(text[9], bg[9])}
        {Days(text[16], bg[16])}
        {Days(text[23], bg[23])}
        {Days(text[30], bg[30])}
        {Days(text[37], bg[37])}
      </View>
      <View style={styles.DayContainer}>
        {Days(text[3], bg[3])}
        {Days(text[10], bg[10])}
        {Days(text[17], bg[17])}
        {Days(text[24], bg[24])}
        {Days(text[31], bg[31])}
        {Days(text[38], bg[38])}
      </View>
      <View style={styles.DayContainer}>
        {Days(text[4], bg[4])}
        {Days(text[11], bg[11])}
        {Days(text[18], bg[18])}
        {Days(text[25], bg[25])}
        {Days(text[32], bg[32])}
        {Days(text[39], bg[39])}
      </View>
      <View style={styles.DayContainer}>
        {Days(text[5], bg[5])}
        {Days(text[12], bg[12])}
        {Days(text[19], bg[19])}
        {Days(text[26], bg[26])}
        {Days(text[33], bg[33])}
        {Days(text[40], bg[40])}
      </View>
      <View style={styles.DayContainer}>
        {Days(text[6], bg[6])}
        {Days(text[13], bg[13])}
        {Days(text[20], bg[20])}
        {Days(text[27], bg[27])}
        {Days(text[34], bg[34])}
        {Days(text[41], bg[41])}
      </View>
    </View>
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
