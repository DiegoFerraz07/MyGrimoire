import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

export const ContainerApp = styled.View`
  flex: 1;
  background-color: #ddd;
  padding-top: ${props => (props.nothing ? 10 : 0)};
  padding-bottom: ${props => (props.nothing ? 10 : 0)};
  padding-left: ${props => (props.nothing ? 10 : 0)};
  padding-right: ${props => (props.nothing ? 10 : 0)}px;
`;

export const CardLogin = styled.View`
  margin-top: 80px;
`;

export const InputLogin = styled.TextInput`
  padding-bottom: 5px;
  padding-right: 5px;
  padding-top: 5px;
  padding-left: 15px;
  color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #5b4500;
`;

export const ImageHeader = styled.Image`
  width: 30px;
  height: ${props => (props.logout ? '24px' : '30px')};
  margin-right: 20px;
  margin-top: ${props => (props.logout ? '10px' : 0)};
  aspect-ratio: 1;
`;
export const TextLogoutHeader = styled.Text`
  font-size: 8px;
  font-weight: bold;
  align-self: center;
  padding-right: 20px;
  margin-top: 3px;
  color: #fff;
`;

export const ContainerLoading = styled.View`
  height: ${Dimensions.get('window').height - 100}px;
  justify-content: center;
  align-items: center;
`;

export const ContainerLoadingNothing = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const ImageNothing = styled.Image`
  align-self: center;
  margin-top: 30px;
  width: 200px;
  height: 186px;
`;

export const TextNothing = styled.Text`
  padding-top: 20px;
  font-size: 20px;
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
  font-size: 16px;
  font-weight: bold;
  color: #d6a200;
  align-self: center;
`;

export const LoadingButton = styled.ActivityIndicator`
  background-color: #d6a200;
  border-width: 1px;
  border-color: #5b4500;
  margin-horizontal: 50px;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
`;

export const ButtonLogin = styled.TouchableOpacity`
  background-color: #d6a200;
  border-width: 1px;
  border-color: #5b4500;
  margin-horizontal: 50px;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
`;

export const ButtonLoginText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  align-self: center;
`;

export const ContainerError = styled.View`
  margin-vertical: 5px;
`;

export const ErrorText = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
