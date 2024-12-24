import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import MarsSportsHomeScreen from './pages/MarsSportsHomeScreen';
import MarsSportsCartScreen from './pages/MarsSportsCartScreen';
import MarsSportsCartSuccessScreen from './pages/MarsSportsCartSuccessScreen';
import MarsSportsReservationScreen from './pages/MarsSportsReservationScreen';
import MarsSportsReservationSuccessScreen from './pages/MarsSportsReserveSuccessScreen';
import MarsSportsContactsScreen from './pages/MarsSportsContactsScreen';
import MarsSportsTranslationsScreen from './pages/MarsSportsTranslationsScreen';
import CloseIcon from './assets/close_icon.png';
import CartIcon from './assets/drawer_cart_icon.png';
import Logo from './assets/drawer_logo.png';
import BackgroundImage from './assets/drawer_background.png';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          height,
          backgroundColor: COLORS.white,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'ГЛАВНАЯ', screen: 'MarsSportsHomeScreen'},
    {label: 'КОРЗИНА', screen: 'MarsSportsCartScreen'},
    {label: 'ТРАНСЛЯЦИИ', screen: 'MarsSportsTranslationsScreen'},
    {label: 'КОНТАКТЫ', screen: 'MarsSportsContactsScreen'},
    {label: 'РЕЗЕРВ СТОЛИКА', screen: 'MarsSportsReservationScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Image source={CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.mainContainer}>
        {drawerItems.map(({label, screen}) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigateToScreen(screen)}
            style={styles.drawerItem}>
            <Text style={styles.itemText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => navigateToScreen('MarsSportsCartScreen')}>
        <Image source={CartIcon} style={styles.cartIcon} />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const drawerScreens = [
  {name: 'MarsSportsHomeScreen', component: MarsSportsHomeScreen},
  {name: 'MarsSportsCartScreen', component: MarsSportsCartScreen},
  {name: 'MarsSportsCartSuccessScreen', component: MarsSportsCartSuccessScreen},
  {name: 'MarsSportsReservationScreen', component: MarsSportsReservationScreen},
  {
    name: 'MarsSportsReservationSuccessScreen',
    component: MarsSportsReservationSuccessScreen,
  },
  {name: 'MarsSportsContactsScreen', component: MarsSportsContactsScreen},
  {
    name: 'MarsSportsTranslationsScreen',
    component: MarsSportsTranslationsScreen,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    height: height,
    width: width,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 40,
  },
  logo: {
    width: width * 0.8,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  mainContainer: {
    marginTop: '15%',
    alignItems: 'center',
    width: width * 0.9,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: 25,
  },
  drawerItem: {
    justifyContent: 'center',
    width: '90%',
    marginTop: 15,
    backgroundColor: COLORS.drawerBackgroundColor,
    paddingVertical: 15,
    borderColor: COLORS.black,
    borderRadius: 25,
  },
  itemText: {
    fontSize: 20,
    fontFamily: FONTS.black,
    color: COLORS.black,
    textAlign: 'center',
  },
  cartIcon: {
    width: 60,
    height: 70,
    alignSelf: 'center',
    objectFit: 'contain',
    position: 'absolute',
    top: 100,
  },
});
