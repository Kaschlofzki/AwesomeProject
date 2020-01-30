import { StyleSheet } from "react-native"


var test = "#68cefe"
var smalltext = 15
var bigtext = 21
var red = "#BD0E00"
var colorButtonRand = '#FF3C09'
var backgroundColor = 'black'

export default StyleSheet.create({
  // BackgroundColor = function() backgroundColor,
  button: {
    alignItems: 'center',
    backgroundColor : backgroundColor,
    padding: 10,
    margin: 10,
    borderColor: '#FF3C09',
    borderWidth: 2,
    color: test,

  },

  backgroundNight: {
    backgroundColor: backgroundColor,
    flex: 1,
    marginTop: 5,
  },

  backgroundDay: {
    backgroundColor: backgroundColor,
    flex: 1,
    marginTop: 5,
  },

  glow: {
    fontSize: 24,
    color: test,
    textAlign: 'center',
    textShadowRadius: 4,
    fontWeight: 'bold'
  },
  glowSmall: {
    fontSize: smalltext,
    color: 'grey',
    textAlign: 'center',
    textShadowRadius: 4
  },
  buttonText: {
    fontSize: smalltext,
    color: test,
    fontWeight: 'bold'
  },
  addSection: {
    flex: 0.15,
    flexDirection: 'row',
    // borderBottomWidth: 1,
    borderColor: 'white',
    justifyContent: 'flex-start'
  },
  addSectionArea: {
    margin: 5
  },
  plusButton: {
    color: test,
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center'
  },
  menuNavi: {
    fontSize: 30,
    marginLeft: 20,
    alignSelf: 'center'
  },
  addedUebung: {
  },
  addedUebungName: {
    fontSize: smalltext,
    color: test,
    textAlign: 'left',
    textShadowRadius: 4,
    fontWeight: 'bold'
  },
  addedUebungDetail: {
    fontSize: smalltext,
    color: test,
    textAlign: 'left',
    textShadowRadius: 4,
    fontWeight: 'bold'
  },
  save: {
    fontSize: smalltext,
    color: test,
    fontWeight: "bold",
  },



  // ***************************** StartTrainingUebung,StartTrainingSet css *************************************************//
  wrapHeader: {
    // borderBottomWidth: 1,
    justifyContent: 'flex-start'
  },
  wrapHeader2: {
    alignSelf: "flex-end",
    // borderBottomWidth: 1,
    justifyContent: 'flex-end',
    marginLeft:30,
    marginRight:5,
    
  },
  wrap: {
    marginBottom: 2,
    flex: 0.3,
    flexDirection: 'column',
    // borderBottomWidth: 1,
    borderColor: '#FF3C09',
    borderWidth: 1,
    justifyContent: 'flex-start',
  },
  nowrap: {
    marginBottom: 2,
    flex: 1,
    flexDirection: 'row',
    // borderBottomWidth: 1,
    borderColor: '#FF3C09',
    borderWidth: 1,
    justifyContent: 'space-between',
  },

  wrapDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  wrapDateSave: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  wrapDetailComponent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  date: {
    fontSize: smalltext,
    color: test,
    fontWeight: "bold",
    marginRight: 80,
  },

  removeButtonSet: {
    fontSize: smalltext,
    color: '#68cefe',
    textAlign: "center",
    alignSelf: "center",
    textShadowRadius: 4,
    fontWeight: "bold",
    marginRight: 8,
    marginLeft: 8,
  },

  deleteUebung: {
    fontSize: smalltext,
    color: red,
    textAlign: "center",
    alignSelf: "center",
    textShadowRadius: 4,
    fontWeight: "bold",
    marginRight: 8,
    // marginLeft: 60,
    paddingTop:5,
    width:25
  },

  textHeader: {
    fontSize: 30,
    color: '#68cefe',
    textAlign: "center",
    textShadowRadius: 4,
    fontWeight: "bold",
    marginLeft: 10,
  },
  text: {
    fontSize: smalltext,
    color: '#68cefe',
    textAlign: "center",
    alignSelf: "center",
    textShadowRadius: 4,
    fontWeight: "bold",
    marginRight: 8,
    marginLeft: 8,
  },
  textInput: {
    width: 40,
    fontSize: 20,
    color: 'black',
    textAlign: "center",
    textShadowRadius: 4,
    fontWeight: "bold",
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: 'grey',
    marginTop: 3,
    marginBottom: 3
  },
  textSet: {
    margin: 5,
    fontSize: 20,
    color: '#68cefe',
    textAlign: "left",
    textShadowRadius: 4,
    fontWeight: "bold",
  },
  // ***************************** UebungVerwalten css *************************************************//
  // text: {
  //   fontSize: smalltext,
  //   color: '#68cefe',
  //   textAlign: "center",
  //   alignSelf: "center",
  //   textShadowRadius: 4,
  //   fontWeight: "bold",
  //   marginRight: 8,
  //   marginLeft: 8,
  // },
  verwaltenEinheitenDetail: {
    flexDirection: 'row',
    justifyContent: 'center',

  },


  // ***************************** Alphabet UebungVerwalten css *************************************************//
  alphabetWrap: {
    flex: 0.3,
    flexDirection: 'column',
    // borderBottomWidth: 1,

    justifyContent: 'flex-start',
  },

  alphabetRows: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  alphabetZeichen: {
    borderColor: 'white',
    borderWidth: 1,
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // ***************************** Uebungen UebungVerwalten css *************************************************//
  textUebungen: {
    fontSize: bigtext,
    color: '#68cefe',
    textAlign: "center",
    alignSelf: "center",
    textShadowRadius: 4,
    fontWeight: "bold",
    paddingLeft:5,
    paddingRight:5,
    // marginTop: 10,
    // marginLeft: 10,
  },

  uebungWrap: {
    flex: 1,
    flexDirection: 'row',
    // borderBottomWidth: 1,
    marginTop:10,
    justifyContent: 'flex-start',
    marginBottom:5,
  },

  uebungColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  uebungButton: {
    borderWidth: 1,
    borderColor: colorButtonRand,
    justifyContent: 'center',
  },
  textButtonUebungen: {
    fontSize: bigtext,
    color: '#FFBB09',
    textAlign: "center",
    alignSelf: "center",
    textShadowRadius: 4,
    fontWeight: "bold",
    paddingLeft:5,
    paddingRight:5,
    // marginTop: 10,
    // marginLeft: 10,
  },

  textButtonUebungen2: {
    fontSize: bigtext,
    color: red,
    textAlign: "center",
    alignSelf: "center",
    textShadowRadius: 4,
    fontWeight: "bold",
    paddingLeft:5,
    paddingRight:5,
    // marginTop: 10,
    // marginLeft: 10,
  },

    // ***************************** Uebungen TrainingVerwalten css *************************************************//

  textUebungen: {
    fontSize: smalltext,
    color: '#68cefe',
    textAlign: "center",
    alignSelf: "center",
    textShadowRadius: 4,
    fontWeight: "bold",
    paddingLeft:5,
    paddingRight:5,
    // marginTop: 10,
    // marginLeft: 10,
  },

  trainingWrap: {
    flex: 0.3,
    flexDirection: 'column',
    // borderBottomWidth: 1,
    marginTop:10,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor:'#FFBB09',
  },

  uebungColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },


  uebungColumn2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  uebungButton: {
    borderWidth: 1,
    borderColor: colorButtonRand,
    justifyContent: 'center',
  },

  uebungButton2: {
    borderWidth: 1,
    borderColor: red,
    justifyContent: 'center',
    marginBottom: 5,
  },

   // ***************************** Header css *************************************************//

  headerSection: {
    flex: 0.25,
    flexDirection: 'row',
    marginTop:15,
    // borderBottomWidth: 1,
    // borderColor: 'white',
    // justifyContent: 'center'
  },

  headerButton: {
    alignItems: 'center',
    backgroundColor: backgroundColor,
    padding: 10,
    margin: 10,
    borderColor: 'blue',
    borderWidth: 2,
    color: test,

  },
 // ***************************** Uebungen UebeungAdd css *************************************************//

  uebungAddTextArt: {
    paddingTop: 10,
    paddingHorizontal: 1,
    textAlign: 'center',
    alignItems: 'center',
    borderColor: 'darkgrey',
    borderWidth: 2,
    color: '#4997D0',
    height: 40,
    marginBottom: 3,
    width: 100,
    fontSize: 19

  },

  uebeungAddText: {
    fontSize: 18,
    paddingTop: 10,
    paddingHorizontal: 1,
    textAlign: 'center',
    alignItems: 'center',
    borderColor: 'darkgrey',
    borderWidth: 2,
    color: '#4997D0',
    height: 40,
    marginBottom: 3,
    width: 150

  },

  uebungAddTextField: {
    flex: 1,
    flexDirection: 'row'
  },

  uebungAddTextInput: {
    marginLeft: 3,
    height: 40,
    width: 150,
    color: '#00AF00',
    borderColor: 'darkgrey',
    borderWidth: 2,
    paddingLeft: 3
  },

  uebungAddButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    borderColor: 'darkgrey',
    borderWidth: 2,
    color: '#4997D0',

  },

  uebungAddmenuNavi: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    margin: 5,
    borderColor: 'darkgrey',
    borderWidth: 2,
    color: '#4997D0',

  },

  uebungAddButtonText: {
    color: '#4997D0',
    fontWeight: 'bold'
  },


  selectSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10
  },

 

})
