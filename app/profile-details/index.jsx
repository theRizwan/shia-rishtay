import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import {
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Switch,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import ProfileInfo from '../../components/ProfileDetails/ProfileInfo';
import ProfileSubInfo from '../../components/ProfileDetails/ProfieSubInfo';
import Requirements from '../../components/ProfileDetails/Requirements';
import GuardionInfo from '../../components/ProfileDetails/GuardianInfo';

const EMPTY_RECT = {
  x: 0,
  y: 0,
  width: 0,
  // default to some value so we're not interpolating by negative values below
  // these update onLayout anyways
  height: 100,
};

function PlaylistProfile() {
  // this will track the scroll value of the Animated.ScrollView
  // use a ref so it doesn't get reset on rerenders
  const scrollY = React.useRef(new Animated.Value(0));

  const [searchLayout, setSearchLayout] = React.useState(EMPTY_RECT);
  const [heroLayout, setHeroLayout] = React.useState(EMPTY_RECT);

  const clampHeroSection = Animated.add(
    // we want to make the hero section maintain its position on scroll
    // we can do this by setting its translateY value to whatever the scroll value is
    scrollY.current,
    // shift it up by subtracting points until we've scrolled beyond the search section, and clamp it after that
    scrollY.current.interpolate({
      inputRange: [0, searchLayout.height],
      outputRange: [0, -searchLayout.height],
      // we also want it to shift down when the user pulls down, so we clamp the above range with 'extrapolateRight'
      // using just 'extrapolate' would clamp the scroll value in both directions
      extrapolateRight: 'clamp',
    }),
  );

  const PLAYLIST_ITEMS_OFFSET = heroLayout.height + searchLayout.height;

  const clampShuffleButton = Animated.add(
    // make the button maintain its position during scroll - i.e the center of the window
    scrollY.current,
    // if we havent scrolled past the hero section, have the shuffle button move up with the scrollview
    scrollY.current.interpolate({
      inputRange: [0, PLAYLIST_ITEMS_OFFSET - SHUFFLE_PLAY_BUTTON_OFFSET],
      outputRange: [0, -PLAYLIST_ITEMS_OFFSET + SHUFFLE_PLAY_BUTTON_OFFSET],
      // after reaching the ~300 points translation, maintain the position at the top
      extrapolateRight: 'clamp',
    }),
  );

  // standard boilerplate for listening to scroll events
  // useNativeDriver means the scroll value will be updated on the native thread (more efficient)
  // this limits what you can do with the Animated.Value - style properties are restricted to transform and opacity
  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY.current}}}],
    {useNativeDriver: true},
  );
  const item = useLocalSearchParams();
  const navigate = useNavigation();

  useEffect(() => {
      navigate.setOptions({
          headerTransparent: true,
          headerTitle: ''
      })
  }, [])


  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.ScrollView
        contentOffset={{y: searchLayout.height}}
        onScroll={handleScroll}
        style={{flex: 1}}>

        <TranslationContainer translateY={clampHeroSection}>
          <View onLayout={({nativeEvent: {layout}}) => setHeroLayout(layout)}>
          <ImageBackground source={{uri:item?.image}} style={{
                width: '100%',
                height: 500
            }}>
            
            </ImageBackground>
          </View>
        </TranslationContainer>

        <PlaylistItems item={item} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

// a wrapper component for translating position with animated values
// doesn't do much, but it cleans up the markup a little bit
function TranslationContainer({children, translateY}) {
  return (
    <Animated.View style={{transform: [{translateY}]}}>
      {children}
    </Animated.View>
  );
}

function PlaylistItems() {
  const item = useLocalSearchParams();
  console.log(item)
  return (
    <View
      style={{
        backgroundColor: 'black',
        color: 'white'
      }}>
      <View style={{zIndex: 2, marginTop: 2}}>
      <LinearGradient
                colors={['#00000000', '#000000']} 
                style={{height : '100%', width : '100%', position: 'absolute',
    bottom: 0,
    height: 300}}>
            </LinearGradient>
      </View>
      <View
        style={{
          padding: 20,
          zIndex: 1,
          marginTop: -SHUFFLE_PLAY_BUTTON_OFFSET,
        }}>
          <ProfileInfo profile={item} />

          <ProfileSubInfo icon="information-circle-outline" sectionName='Personal Information' profile={item} />
          <ProfileSubInfo icon="information-circle-outline" sectionName='Education Details' profile={item} />
          <ProfileSubInfo icon="information-circle-outline" sectionName='Occupation Details' profile={item} />
          <ProfileSubInfo icon="information-circle-outline" sectionName='Religious Details' profile={item} />
          <ProfileSubInfo icon="information-circle-outline" sectionName='Residence Details' profile={item} />

          <Requirements about={item?.about} />
          <GuardionInfo item={item} />

          <View style={{ height: 70}}>

          </View>
      </View>
    </View>
  );
}

const SHUFFLE_PLAY_BUTTON_HEIGHT = 60;
// offset is used to move the button slightly outside its container view
// this gives it the effect of sitting halfway between the hero section and the playlist items section
const SHUFFLE_PLAY_BUTTON_OFFSET = SHUFFLE_PLAY_BUTTON_HEIGHT / 2;



export default PlaylistProfile;

function PlaylistRow({playlistItem}) {
  return (
    <View style={{marginBottom: 20}}>
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        {playlistItem.song}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontWeight: '500', color: 'white'}}>
          {playlistItem.artist}
        </Text>
        <View
          style={{
            width: 4,
            height: 4,
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 2,
            marginHorizontal: 4,
          }}
        />
        <Text style={{fontWeight: '500', color: 'white'}}>
          {playlistItem.album}
        </Text>
      </View>
    </View>
  );
}

const playlistItems = [
  {
    id: 0,
    song: `Scott Street`,
    artist: `Phoebe Bridgers`,
    album: `Stranger in the Alps`,
  },
  {
    id: 1,
    song: `Don't Miss It`,
    artist: `James Blake`,
    album: `Assume Form`,
  },
  {
    id: 2,
    song: `Unbearably White`,
    artist: `Vampire Weekend`,
    album: `Father of the Bride`,
  },
  {
    id: 3,
    song: `If You Need To, Keep Time On Me`,
    artist: `Fleet Foxes`,
    album: `Crack-Up`,
  },
  {
    id: 4,
    song: `Small Worlds`,
    artist: `Rayland Baxter`,
    album: `Good Mmornin`,
  },
  {
    id: 5,
    song: `Re: Stacks`,
    artist: `Bon Iver`,
    album: `For Emma, Forever Ago`,
  },
  {
    id: 6,
    song: `Souther Nights`,
    artist: `Whitney`,
    album: `Light Upon the Lake: Demo Recordings`,
  },
];