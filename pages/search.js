import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, View, Alert} from 'react-native';
import database from './database';

const myDatabase = new database();

const SearchPage = ({ navigation }) => {
    const [buttons, setButtons] = React.useState('');

    const [Search, setSearch] = React.useState('');
    
    const renderButtons = (someText) => {
        myDatabase.Search(someText, navigation).then(buttons => {
            setButtons(buttons);
        }).catch(error => {
            console.log(error);
        });

        setSearch(someText);

    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                name="Search"
                onChangeText={renderButtons}
                value={Search}
                placeholder="SEARCH"
            />
            {buttons}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor:'#1B2558',
    },
    input: {
        width:"99%",
        backgroundColor:'#D9D9D9',
        height: 40,
        margin: 12,
        padding: 10,
        borderRadius: 20,
        position: 'absolute',
        top: 40,
    },

    buttonStyle:{
        padding: 10,
    },
      
});

export default SearchPage;