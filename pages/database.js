import {Alert, Button, View} from 'react-native';
import * as SQLite from "expo-sqlite";
import databaseinit from './sqldatabase';
import Global from './context';

const mydatabaseinit = new databaseinit();

const db = SQLite.openDatabase("LastNewDB.db");

class database {
      init(){
        db.transaction((tx) => {
          tx.executeSql(`
          CREATE TABLE IF NOT EXISTS "Users" (
            "UserID" INTEGER NOT NULL,
            "Login" TEXT NOT NULL UNIQUE,
            "Password" TEXT NOT NULL,
            "Access" INTEGER NOT NULL,
            PRIMARY KEY("UserID" AUTOINCREMENT)
        );`);
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS "Ingredients" (
          "idIngredients" INTEGER NOT NULL,
          "Name" TEXT NOT NULL UNIQUE,
          PRIMARY KEY("idIngredients" AUTOINCREMENT)
        );`);
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS "Universe" (
          "idUniverse" INTEGER NOT NULL,
          "Name" TEXT NOT NULL UNIQUE,
          "Description" TEXT NOT NULL,
          PRIMARY KEY("idUniverse" AUTOINCREMENT)
        );`);
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS "Recipe" (
          "idRecipe" INTEGER NOT NULL,
          "idUniverse" INTEGER NOT NULL,
          "idAuthor" INTEGER NOT NULL,
          "Name" TEXT NOT NULL UNIQUE,
          "Calories" TEXT NOT NULL,
          "Description" TEXT NOT NULL,
          "Stages" TEXT NOT NULL,
          "Comment" TEXT NOT NULL,
          "Image" TEXT NOT NULL,
          "Status" INTEGER NOT NULL,
          PRIMARY KEY("idRecipe" AUTOINCREMENT),
          FOREIGN KEY("idUniverse") REFERENCES "Universe"("idUniverse") ON DELETE CASCADE,
          FOREIGN KEY("idAuthor") REFERENCES "Users"("UserID") ON DELETE CASCADE
        );`);
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS "Favorites" (
          "idUser" INTEGER NOT NULL,
          "idRecipe" INTEGER NOT NULL,
          FOREIGN KEY("idUser") REFERENCES "Users"("UserID") ON DELETE CASCADE,
          FOREIGN KEY("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE CASCADE
        );`);
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS "Rating" (
          "idRating" INTEGER,
          "idUser" INTEGER NOT NULL,
          "idRecipe" INTEGER NOT NULL,
          "value" INTEGER NOT NULL,
          PRIMARY KEY("idRating" AUTOINCREMENT),
          FOREIGN KEY("idUser") REFERENCES "Users"("UserID") ON DELETE CASCADE,
          FOREIGN KEY("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE CASCADE
        );`);
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS "Recipe_Ingredients" (
          "idIngredients" INTEGER NOT NULL,
          "idRecipe" INTEGER NOT NULL,
          "Value" INTEGER NOT NULL,
          "Unit" TEXT NOT NULL,
          FOREIGN KEY("idIngredients") REFERENCES "Ingredients"("idIngredients") ON DELETE CASCADE,
          FOREIGN KEY("idRecipe") REFERENCES "Recipe"("idRecipe") ON DELETE CASCADE
        );
          `);
        });

        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO Users (Login, Password, Access) VALUES (?, ?, ?)',
            ['Admin', 'admin', 1] 
          );
        });

        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO Ingredients (Name) VALUES (?)',
            ['мука']  
          );
          tx.executeSql(
            'INSERT INTO Ingredients (Name) VALUES (?)',
            ['разрыхлитель']  
          );
          tx.executeSql(
            'INSERT INTO Ingredients (Name) VALUES (?)',
            ['соль']  
          );
          tx.executeSql(
            'INSERT INTO Ingredients (Name) VALUES (?)',
            ['сливочное масло']  
          );
          tx.executeSql(
            'INSERT INTO Ingredients (Name) VALUES (?)',
            ['сахар']  
          );
          tx.executeSql(
            'INSERT INTO Ingredients (Name) VALUES (?)',
            ['сливки']  
          );
          tx.executeSql(
            'INSERT INTO Ingredients (Name) VALUES (?)',
            ['мед']  
          );

          tx.executeSql(
            'INSERT INTO Ingredients (Name) VALUES (?)',
            ['имбирь молотый']  
          );

          tx.executeSql(
            'INSERT INTO Ingredients (Name) VALUES (?)',
            ['корица молотая']  
          );
        });

        db.transaction((tx) => {
          tx.executeSql(
              `INSERT INTO Universe (Name, Description) VALUES (?, ?)`,
              ['Властелин колец', 'Вымышленная фэнтезийная вселенная, созданная британским писателем Дж.Р.Р. Толкином. Она состоит из различных континентов, населенных разными расами, такими как люди, эльфы, гномы, хоббиты, орки и т.д.']  
          );
          tx.executeSql(
              `INSERT INTO Recipe (idUniverse, idAuthor, Name, Calories, Description, Stages, Comment, Image, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [1, 1, 'Эльфийский хлеб Лембас', '229 кКал', 'Известный всем поклонникам «Властелина Колец» хлеб Лембас представляет из себя настоящую еду путешественников. По легенде данный рецепт надежно хранится эльфами.', 'Шаг 1\nМуку просеять через сито. Соединить разрыхлитель, соль, сахар, корицу, молотый имбирь и перемешать с мукой.\nШаг 2Холодное сливочное масло нарезать кубиком или натереть на терке и добавить к сухой смеси.\nШаг 3\nРастереть все руками до состояния крошки. В центре горки сделать углубление.\nШаг 4\nВлить сливки.\nШаг 5\nДобавить мед.\nШаг 6Перемешать сухие и жидкие составляющие, пока мука не впитает всю влагу. Выложить тесто на столешницу и продолжить месить, пока тесто станет гладким и эластичным.\nШаг 7\nГотовое тесто оформить в шар, обернуть пищевой пленкой и положить в холодильник на 30 минут.\nШаг 8\nОхлажденное тесто раскатать в прямоугольник, примерно 20х30 см и толщиной 5 мм. Лучше это сделать сразу на пергаментной бумаге. Так будет легче перенести Лембас на противень. На нем же хлеб и будет выпекаться.\nШаг 9\nНарезать тесто на квадраты со стороной 10х10 см.\nШаг 10\nВ середине каждого квадрата сделать надрезы крест-накрест, не прорезая тесто до конца. Выпекать Лембас в духовке, разогретой до 200 градусов в течение 15 минут.', 'Вкусно', 'Картинка', 1]
          );

          tx.executeSql(
              `INSERT INTO Recipe_Ingredients (idIngredients, idRecipe, Value, Unit) VALUES (?, ?, ?, ?)`,
              [1, 1, '1,5','стакана']  
          );

          tx.executeSql(
              `INSERT INTO Recipe_Ingredients (idIngredients, idRecipe, Value, Unit) VALUES (?, ?, ?, ?)`,
              [2, 1, '1','ч.л.']  
          );
          
          tx.executeSql(
              `INSERT INTO Recipe_Ingredients (idIngredients, idRecipe, Value, Unit) VALUES (?, ?, ?, ?)`,
              [3, 1, '','']  
          );
          
          tx.executeSql(
              `INSERT INTO Recipe_Ingredients (idIngredients, idRecipe, Value, Unit) VALUES (?, ?, ?, ?)`,
              [4, 1, '70','г']  
          );

          tx.executeSql(
              `INSERT INTO Recipe_Ingredients (idIngredients, idRecipe, Value, Unit) VALUES (?, ?, ?, ?)`,
              [5, 1, '0,25','стакана']  
          );

          tx.executeSql(
              `INSERT INTO Recipe_Ingredients (idIngredients, idRecipe, Value, Unit) VALUES (?, ?, ?, ?)`,
              [6, 1, '1','ч.л.']  
          );

          tx.executeSql(
              `INSERT INTO Recipe_Ingredients (idIngredients, idRecipe, Value, Unit) VALUES (?, ?, ?, ?)`,
              [7, 1, '0,5','ч.л.']  
          );

          tx.executeSql(
              `INSERT INTO Recipe_Ingredients (idIngredients, idRecipe, Value, Unit) VALUES (?, ?, ?, ?)`,
              [8, 1, '1','ч.л.']  
          );

          tx.executeSql(
              `INSERT INTO Recipe_Ingredients (idIngredients, idRecipe, Value, Unit) VALUES (?, ?, ?, ?)`,
              [9, 1, '100','мл']  
          );

        });
        /*
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT Recipe.Name, Recipe.Calories, Recipe.Description, Recipe.Stages, Recipe.Comment, Recipe.Image, 
            Ingredients.Name AS IngredientsName, Recipe_Ingredients.Value, Recipe_Ingredients.Unit, Universe.Name AS UniverseName, Universe.Description
            FROM Recipe
            INNER JOIN Recipe_Ingredients ON Recipe.idRecipe = Recipe_Ingredients.idRecipe
            LEFT JOIN Ingredients ON Recipe_Ingredients.idIngredients = Ingredients.idIngredients
            INNER JOIN Universe ON Recipe.idUniverse = Universe.idUniverse
            WHERE Recipe.Name = ?;`,
            ['Эльфийский хлеб Лембас'],
            (tx, results) => {
              const rows = results.rows;
              for (let i = 0; i < rows.length; i++) {
                console.log(rows.item(i).IngredientsName + "||" + rows.item(i).Unit + "||" + rows.item(i).Value)
              }
              
            }
          );
        });
        */
        
      }        
      
      addUsers(name, password) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
              tx.executeSql(
                'INSERT INTO Users (Login, Password, Access) VALUES (?, ?, ?)',
                [name, password, 1],
                (tx, results) => {
                  resolve(results);
                },
                error => {
                  console.log(error);
                  reject();
                }
              );
            });
          });
      }
            
      Authorization(login, passwordtx) {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM Users WHERE Login = ?',
              [login],
              (tx, results) => {
                const len = results.rows.length;
                const row = results.rows.item(0);
                if (len !== 0) {
                  if (row.Password == passwordtx) {
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                } else {
                  resolve(false);
                }
              },
              error => {
                console.log(error);
                reject();
              },
            );
          });
        });
      }

      Search(name, navigation) {
        return new Promise((resolve, reject) => {
          const buttons = [];
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM Recipe WHERE Name LIKE ?',
              [`%${name}%`],
              (tx, results) => {
                const len = results.rows.length;
                for(let i = 0; i < len; i++){
                  const row = results.rows.item(i);
                  const button = (<View key={row.idRecipe} style={{margin:10}}><Button key={row.idRecipe} title={row.Name} onPress={() => {Global.NameRec = row.Name; Global.IdRec = row.idRecipe; navigation.navigate('RecipeDetailsScreen');}}
                  /></View>);
                  buttons.push(button);
                }
                resolve(buttons);
              },
              error => {
                console.log(error);
                reject(error);
              }
            );
          });
        });   
      }

      CardsOne() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT Recipe.idRecipe, Recipe.Name, Recipe.Calories, Recipe.Description, Recipe.Stages, Recipe.Comment, Recipe.Image, Universe.Name AS UniverseName, Universe.Description AS UniverseDescription
              FROM 
              Recipe INNER JOIN Universe ON Recipe.idUniverse = Universe.idUniverse
              WHERE Recipe.Name = ?;`,
              [Global.NameRec],
              (tx, results) => {
                const rowOne = results.rows.item(0);
                resolve(rowOne);
               
              },
              error => {
                console.log(error);
                reject(error);
              }
            );
          });
        });   
      }

      CardsTwo() {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(
              `SELECT Ingredients.Name, Recipe_Ingredients.Value, Recipe_Ingredients.Unit
               FROM 
               Recipe_Ingredients INNER JOIN Ingredients ON Recipe_Ingredients.idIngredients = Ingredients.idIngredients
               WHERE Recipe_Ingredients.idRecipe = ?;`,
              [Global.IdRec],
              (tx, results) => {
                const rowTwo = results.rows;
                resolve(rowTwo);
              },
              error => {
                console.log(error);
                reject(error);
              }
            );
          });
        });   
      }
}

export default database;