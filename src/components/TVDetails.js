import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GET } from '../service/API';
import Styles from "../Styles/Styles";
import { POSTER_IMAGE } from '../service/config';
import TopCast from '../utils/TopCast';
import TrendingTV from './TrendingTV';
import { getImageSource } from '../utils/ImageDisplay';
import { Feather } from '@expo/vector-icons';


const TVDetails = props => {
  const [details, setDetails] = useState();
  
  useEffect(() => {
    const getDetails = async () => {
      const data = await GET(`/tv/${props.route.params.tv_id}`);
      // const dataVideo = await GET(`/tv/${props.route.params.tv_id}/videos`);

      // console.log(data.networks);
      setDetails(data);
    };
    getDetails();
  }, []);

  // lấy ngôn ngữ
  const language = () => {
    return details.spoken_languages.map((spoken_language, index) => (
      <View key={index}>
        <Text style={{ ...Styles.textDetails, fontSize: 15, }}>
          {spoken_language.english_name}
        </Text>
      </View>
    ));
  };

  const networks = () => {
    return details.networks.map((networks, index) => (
      <View key={index} style={
        { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
      }>
        <Text style={{ ...Styles.textDetails, fontSize:18, }}>
          | {networks.name}
        </Text>
        <Image source={{ uri: `${POSTER_IMAGE}${networks.logo_path}` }}
          style={{ width: 50, height: 25, borderRadius: 5, resizeMode: 'stretch' }} />
      </View>
    ));
  };

  return (
    <ScrollView style={Styles.sectionBg}>
      <View>
        {/* kiểm tra giá trị details trc khi truy cập */}
        {details && (
          <>
            <View style={{ position: 'relative' }}>
              <Image source={{ uri: getImageSource(details) }} style={Styles.imageBg} />
              {
                details.homepage ?
                  <View style={Styles.linkContainer}>
                    <TouchableOpacity onPress={() => {
                      Linking.openURL(details.homepage);
                    }}>
                      <Feather name="link-2" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View> : null
              }
            </View>
            <View style={Styles.circleContainer}>
              <Text style={Styles.voteAverage}>
                {Math.round(details.vote_average * 10)}%
              </Text>
            </View>
            <Text style={Styles.detailsTitle}>{details.original_name}</Text>
            {/* tagline */}
            <Text style={Styles.tagLine}>{details.tagline}</Text>

            {/* tổng quan */}
            <Text style={Styles.headingLeft}>OVERVIEW</Text>
            <Text style={Styles.overview}>{details.overview}</Text>
            <View style={Styles.hr}></View>
            {/* row 1 */}
            <View style={Styles.detailsContainer}>
              {/* Ngôn ngữ */}
              <View>
                <Text style={Styles.headingLeft} >Language</Text>
                <Text style={{ ...Styles.textDetails, fontSize: 15, }}>{language()}</Text>
              </View>
              <View>
                <Text style={Styles.headingLeft}>Status</Text>
                <Text style={Styles.textDetails}>{details.status}</Text>
              </View>
            </View>
            <View style={Styles.hr}></View>
            {/* row 2 */}
            <View style={Styles.detailsContainer}>
              <View>
                <Text style={Styles.headingLeft}>First Air</Text>
                <Text style={Styles.textDetails}>{details.first_air_date}</Text>
              </View>
              <View>
                <Text style={Styles.headingLeft}>Last Air</Text>
                <Text style={Styles.textDetails}>{details.last_air_date}</Text>
              </View>
            </View>
            {/* row 3 */}
            <View style={Styles.hr}></View>
            <Text style={Styles.headingLeft}>Type</Text>
            <Text style={{ ...Styles.textDetails, marginBottom: 15, }}>{details.type}</Text>
            <View style={Styles.hr}></View>
            <Text style={Styles.headingLeft}>Networks</Text>
            <Text style={{ ...Styles.textDetails, marginBottom: 15, }}>{networks()}</Text>
            {/* row 4  */}
            <View style={Styles.hr}></View>
            <View>
              <TopCast navigation={props.navigation}
                title="Top Billed Cast"
                url={`/tv/${props.route.params.tv_id}/credits`} />
            </View>
            <View style={Styles.hr}></View>
            <TrendingTV
              navigation={props.navigation}
              title="Similar TV"
              url={`/tv/${props.route.params.tv_id}/similar`} />
            <View style={Styles.hr}></View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
export default TVDetails;