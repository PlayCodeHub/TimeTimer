import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import Layout from '../constants/Layout';
import { RootTabScreenProps } from '../types';
import Clock from '../components/Clock';
import Pie from '../components/pie';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const size = Layout.window.width - Layout.window.width *0.3;
  return (
    <View style={{
      flex: 1,
      backgroundColor: "rgba(255,255,255,0.3) ",
      flexDirection: "row",
      justifyContent: "center"
    }}>
    <Clock size={size} />
  <Pie size={size} percentage={70} color={"rgb(199,17,46)"}/>  
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
