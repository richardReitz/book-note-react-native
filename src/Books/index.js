import React from 'react';
import {} from 'react-native';
import {Container, Name, Price, CenterView, Btn, BtnText} from './styles';

export default function Books({data, edit, del}) {
 return (
   <Container>
       <Name>{data.name}</Name>
       <Price>R${data.price}</Price>
       <CenterView>
           <Btn onPress={ ()=> edit(data) }>
               <BtnText>Edit</BtnText>
           </Btn>
           <Btn onPress={ ()=> del(data) }>
               <BtnText>Delete</BtnText>
           </Btn>
       </CenterView>
   </Container>
  );
}