import React, {useEffect, useState} from 'react';
import {Keyboard, StatusBar} from 'react-native';
import {Container, Title, InputTitle, Input, BtnArea, Button, TextBtn, List} from './styles';
import Books from './Books';
import getRealm from './services/realm';

console.disableYellowBox=true;

export default function App() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [idEdit, setIdEdit] = useState(null);
    const [books, setBooks] = useState([]);
    const [disableBtn, setDisableBtn] = useState(false);

    useEffect(()=>{
        loadBooks = async () => {
            const realm = await getRealm();
            const data = realm.objects('Book');
            setBooks(data);
        };
        loadBooks();
    }, [])

    saveBook = async(data) => {
        const realm = await getRealm();

        const id = realm.objects('Book').sorted('id', true).length > 0
        ? realm.objects('Book').sorted('id', true)[0].id + 1 : 1;

        const dataBook = {
            id: id,
            name: data.name,
            price: data.price
        }
        realm.write(()=>{
            realm.create('Book', dataBook)
        });
    }

    addBook = async () => {
        if(name === '' || price === ''){
            alert('Fill in all fields');
            return;
        }
        try{
            const data = {name: name, price: price};
            await saveBook(data);
    
            setName('');
            setPrice('');
            Keyboard.dismiss();

        }catch(err){
            alert(err);
        }
    };

    function editBook(data){
        setName(data.name);
        setPrice(data.price);
        setIdEdit(data.id);   
        setDisableBtn(true);   
    };

    bookToEdit = async () => { 
        if(idEdit === null){
            alert('No books to edit!');
            return;
        }

        const realm = await getRealm();

        const response = {
            id: idEdit,
            name: name,
            price: price
        };
        await realm.write(()=>{
            realm.create('Book', response, 'modified')
        });

        const dataChanged = await realm.objects('Book').sorted('id', false);
        setBooks(dataChanged);
        setName('');
        setPrice('');
        setIdEdit(null);
        Keyboard.dismiss();
        setDisableBtn(false);
    }

    deleteBook = async (data) => {
        const realm = await getRealm();
        const ID = data.id;

        realm.write(()=>{
            if(realm.objects('Book').filtered('id ='+ID).length > 0){
                realm.delete(
                    realm.objects('Book').filtered('id ='+ ID)
                )
            }
        })
        const currentBooks =  await realm.objects('Book').sorted('id', false);
        setBooks(currentBooks);
    }

 return (
   <Container>
       <StatusBar backgroundColor="#2C3E50" barStyle='light-content'/>
       <Title>Book Note</Title>
       <InputTitle>Name</InputTitle>
       <Input
       value={name}
       autocorrect={false}
       autoCapitalize="none"
       onChangeText={(text)=> setName(text)}
       />
       <InputTitle>Price</InputTitle>
       <Input
       value={price}
       keyboardType="numeric"
       autocorrect={false}
       autoCapitalize="none"
       onChangeText={(text)=> setPrice(text)}
       />
       <BtnArea>
           <Button
           onPress={addBook}
           disabled={disableBtn}
           style={{opacity: disableBtn ? 0.4 : 1}}
           >
               <TextBtn>Add</TextBtn>
           </Button>
           <Button onPress={bookToEdit}>
               <TextBtn>Edit</TextBtn>
           </Button>
       </BtnArea>
       <List 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        data={books}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (<Books data={item} edit={editBook} del={deleteBook}/>)}
        />
   </Container>
  );
}