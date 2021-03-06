import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const ContainerApp = styled.View`
  flex: 1;
  background-color: #ddd;
  padding-top: ${props => (props.nothing ? 10 : 0)};
  padding-bottom: ${props => (props.nothing ? 10 : 0)};
  padding-left: ${props => (props.nothing ? 10 : 0)};
  padding-right: ${props => (props.nothing ? 10 : 0)};
`;

export const CardLogin = styled.View`
  margin-top: 80;
`;

export const InputLogin = styled.TextInput`
  padding-bottom: 5;
  padding-right: 5;
  padding-top: 5;
  padding-left: 15;
  color: #fff;
  border-bottom-width: 1;
  border-bottom-color: #5b4500;
`;

export const ImageHeader = styled.Image`
  width: 30;
  height: ${props => (props.logout ? 24 : 30)};
  margin-right: 20;
  margin-top: ${props => (props.logout ? '10px' : 0)};
  aspect-ratio: 1;
`;
export const TextLogoutHeader = styled.Text`
  font-size: 8;
  font-weight: bold;
  align-self: center;
  padding-right: 20;
  margin-top: 3;
  color: #fff;
`;

export const ContainerLoading = styled.View`
  height: ${Dimensions.get('window').height - 100};
  justify-content: center;
  align-items: center;
`;

export const ContainerLoadingNothing = styled.View`
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
`;

export const ImageNothing = styled.Image`
  align-self: center;
  margin-top: 30;
  width: 200;
  height: 186;
`;

export const TextNothing = styled.Text`
  padding-top: 20;
  font-size: 20;
  color: #d6a200;
  font-weight: bold;
  align-self: center;
`;

export const ImageBackground = styled.Image`
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

export const TextFooterLogin = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: #d6a200;
  align-self: center;
`;

export const LoadingButton = styled.ActivityIndicator`
  background-color: #d6a200;
  border-width: 1;
  border-color: #5b4500;
  margin-horizontal: 50;
  margin-top: 10;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  border-radius: 5;
`;

export const ButtonLogin = styled.TouchableOpacity`
  background-color: #d6a200;
  border-width: 1;
  border-color: #5b4500;
  margin-horizontal: 50;
  margin-top: 10;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  border-radius: 5;
`;

export const ButtonLoginText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18;
  align-self: center;
`;

export const ContainerError = styled.View`
  margin-vertical: 5;
`;

export const ErrorText = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 18;
  font-weight: bold;
`;
