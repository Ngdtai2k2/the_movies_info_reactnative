import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Modal, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GET } from '../service/API';
import Styles from '../Styles/Styles';
import TrendingMovies from './TrendingMovies';
import { getImageSource } from '../utils/ImageDisplay';
import { FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import YouTube from 'react-native-youtube-iframe';
import { translateEnglishToVietnamese } from '../utils/Helper';
import { TopInfo } from '../utils/TopInfo';
import Constants from '../constants/Constants';
import { TMDB_URL } from '../service/config';

const MovieDetails = (props) => {
  const [details, setDetails] = useState();
  // details là biến hiện tại của state và setDetails là hàm cập nhập gtri cho biên
  const [keyTrailer, setTrailer] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [translated, setTranslated] = useState('');

  useEffect(() => {
    const getDetails = async () => {
      const data = await GET(`/movie/${props.route.params.movieId}`);
      const dataVideo = await GET(`/movie/${props.route.params.movieId}/videos`);
      setDetails(data);

      if (data.overview) {
        translateEnglishToVietnamese(data.overview, setTranslated);
      } else {
        setTranslated('Xin lỗi chúng tôi chưa có thông tin!');
      }
      
      // setTranslated(data.overview)
      const firstTrailer = dataVideo.results.find(item => item.type === 'Trailer');
      if (firstTrailer) {
        setTrailer(firstTrailer.key);
        // console.log(firstTrailer.key);
      }
    };
    getDetails();

  }, []);

  const handleOpenPopup = () => {
    setModalVisible(true);
  };

  const handleClosePopup = () => {
    setModalVisible(false);
  };

  // lấy thể loại phim
  const genres = () => {
    // map sẽ thực hiện lặp qua từng phần tử của mảng
    // trả về một mảng mới chứa các giá trị mới
    return details.genres.map((genres, index) => (
      <View key={index} style={Styles.genreContainer}>
        <Text style={Styles.genre}>{genres.name}</Text>
      </View>
    ));
  };
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
                      <Feather name='link-2' size={24} color='#fff' />
                    </TouchableOpacity>
                  </View> : null
              }
            </View>
            <View style={Styles.circleContainer}>
              <Text style={Styles.voteAverage}>
                {Math.round(details.vote_average * 10)}%
              </Text>
            </View>
            <Text style={Styles.detailsTitle}>{details.original_title}</Text>

            {/* tagline */}
            <Text style={Styles.tagLine}>{details.tagline}</Text>
            <TouchableOpacity onPress={handleOpenPopup}>
              <Text style={Styles.buttonPlay}>
                <FontAwesome name='play' size={18} color='#808080' />  Trailer
              </Text>
            </TouchableOpacity>
            {/* Popup chứa video trailer */}
            <Modal visible={isModalVisible} animationType='slide' onRequestClose={handleClosePopup} transparent={true}>
              <View style={Styles.modalContainer}>
                {/* Nút đóng modal */}
                <TouchableOpacity onPress={handleClosePopup} style={Styles.closeButton}>
                  <Ionicons name='close' size={30} color='#fff' />
                </TouchableOpacity>
                <View style={Styles.videoContainer}>
                  {/* Sử dụng YouTube */}
                  <YouTube
                    videoId={keyTrailer}
                    play={true}
                    loop={true}
                    height={400}
                    width={350}
                  // onChangeState={(event) => console.log(event)}
                  />
                </View>
              </View>
            </Modal>
            {/* tổng quan */}
            <Text style={{ ...Styles.headingLeft, marginTop: 20, }}>NỘI DUNG</Text>
            <Text style={Styles.overview}>{translated}</Text>
            <View style={Styles.hr}></View>
            {/* row 1 */}
            <View style={Styles.detailsContainer}>
              <View>
                <Text style={Styles.headingLeft}>Thời lượng</Text>
                <Text style={Styles.textDetails}>
                  {details.runtime} phút
                </Text>
              </View>
              {/* trạng thái phát hành */}
              {/* nếu trạng thái trả về là Released sẽ hiển thị thêm ngày */}
              <View>
                <Text style={Styles.headingLeft}>Trạng thái</Text>
                <Text style={Styles.textDetails}>
                  {details.status === 'Released'
                    ? `Phát hành: ${details.release_date}`
                    : details.status}
                </Text>
              </View>
            </View>
            <View style={Styles.hr}></View>
            {/* row 2 */}
            <View style={Styles.detailsContainer}>
              <View>
                {/* ngân sách */}
                <Text style={Styles.headingLeft}>Ngân sách</Text>
                <Text style={Styles.textDetails}>
                  {/* kiểm tra ngân sách và hiển thị null khi =0 */}
                  {details.budget > 0
                    ? details.budget.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })
                    : 'Không xác định'}
                </Text>
              </View>
              <View>
                {/* doanh thu */}
                <Text style={Styles.headingLeft}>Doanh thu</Text>
                <Text style={Styles.textDetails}>
                  {/* kiểm tra doanh thu và hiển thị null khi =0 */}
                  {details.revenue > 0
                    ? details.revenue.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })
                    : 'Không xác định'}
                </Text>
              </View>
            </View>

            {/* row 3 */}
            {/* Ngôn ngữ */}
            <View style={Styles.hr}></View>
            <Text style={Styles.headingLeft}>Ngôn ngữ</Text>
            <Text style={{ display: 'flex', flexDirection: 'row', }}>
              {language()}
            </Text>

            {/* row 4 */}
            <View style={Styles.hr}></View>
            <Text style={Styles.headingLeft}>Thể loại</Text>
            <Text>
              {genres()}
            </Text>

            {/* row 5 */}
            <View style={Styles.hr}></View>
            <View>
              <TopInfo navigation={props.navigation}
                type='cast'
                title='Diễn viên tham gia'
                url={`/movie/${props.route.params.movieId}/credits`} />
            </View>
            <View>
              <TopInfo navigation={props.navigation}
                type='crew'
                title='Tham gia sản xuất'
                url={`/movie/${props.route.params.movieId}/credits`} />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {
              Linking.openURL(`${TMDB_URL}/${props.route.params.movieId}`);
            }} >
              <Text style={styles.textButton}>Xem thêm</Text>
            </TouchableOpacity>
            {/* row 7 */}
            <View style={Styles.hr}></View>
            <TrendingMovies
              navigation={props.navigation}
              title='Phim tương tự'
              url={`/movie/${props.route.params.movieId}/similar`} />
            <View style={Styles.hr}></View>

          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 15,
    backgroundColor: Constants.barColor,
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  },
  textButton: {
    textAlign: 'center',
    color: Constants.textColorWhite,
  },
})

export default MovieDetails;