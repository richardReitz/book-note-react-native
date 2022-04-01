import styled from 'styled-components/native';

export const Container = styled.View`
padding: 15px;
background-color: rgba(255,255,255, .2);
border-radius: 5px;
margin-bottom: 10px;
`;

export const Name = styled.Text`
color: #ffffff;
font-size: 22px;
font-weight: bold;
text-transform: uppercase;
`;

export const Price = styled.Text`
color: #ffffff;
font-size: 18px;
font-style: italic;
`;

export const CenterView = styled.View`
flex-direction: row;
margin-top: 10px;
`;

export const Btn = styled.TouchableOpacity`
background-color: #ffffff;
margin-right: 15px;
padding: 3px 8px;
border-radius: 3px;
`;

export const BtnText = styled.Text`
color: #2C3E50;
font-size: 16px;
`;