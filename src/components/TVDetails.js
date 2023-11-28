import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GET } from "../service/API";
import Styles from "../Styles/Styles";
import { POSTER_IMAGE } from "../service/config";
import TiviShow from "./TiviShow";
import { getImageSource } from "../utils/ImageDisplay";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import YouTube from "react-native-youtube-iframe";
import { translateEnglishToVietnamese } from "../utils/Helper";
import { PersonInformation } from "../utils/PersonInformation";
import Loading from "./Loading";

const TVDetails = (props) => {
  const [details, setDetails] = useState();
  const [keyTrailer, setTrailer] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const data = await GET(`/tv/${props.route.params.tv_id}`);
        const dataVideo = await GET(`/tv/${props.route.params.tv_id}/videos`);

        setDetails(data);

        if (data.overview) {
          translateEnglishToVietnamese(data.overview, setTranslated);
        } else {
          setTranslated("Xin lỗi chúng tôi chưa có thông tin!");
        }

        const firstTrailer = dataVideo.results.find(
          (item) => item.type === "Trailer"
        );
        if (firstTrailer) {
          setTrailer(firstTrailer.key);
        }
      } catch (error) {
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [props.route.params.tv_id]);

  const handleOpenPopup = () => {
    setModalVisible(true);
  };

  const handleClosePopup = () => {
    setModalVisible(false);
  };

  const language = () => {
    return details.spoken_languages.map((spoken_language, index) => (
      <View key={index}>
        <Text style={{ ...Styles.textDetails, fontSize: 15 }}>
          {spoken_language.english_name}
        </Text>
      </View>
    ));
  };

  const networks = () => {
    return details.networks.map((networks, index) => (
      <View
        key={index}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ ...Styles.textDetails, fontSize: 18 }}>
          | {networks.name}
        </Text>
        <Image
          source={{ uri: `${POSTER_IMAGE}${networks.logo_path}` }}
          style={{
            width: 50,
            height: 25,
            borderRadius: 5,
            resizeMode: "stretch",
          }}
        />
      </View>
    ));
  };

  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <ScrollView style={Styles.sectionBg}>
      <View>
        {details && (
          <>
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: getImageSource(details) }}
                style={Styles.imageBg}
              />
              {details.homepage ? (
                <View style={Styles.linkContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(details.homepage);
                    }}
                  >
                    <Feather name="link-2" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            <View style={Styles.circleContainer}>
              <Text style={Styles.voteAverage}>
                {Math.round(details.vote_average * 10)}%
              </Text>
            </View>
            <Text style={Styles.detailsTitle}>{details.original_name}</Text>
            <Text style={Styles.tagLine}>{details.tagline}</Text>
            <TouchableOpacity onPress={handleOpenPopup}>
              <Text style={Styles.buttonPlay}>
                <FontAwesome name="play" size={18} color="#808080" /> Trailer
              </Text>
            </TouchableOpacity>
            <Modal
              visible={isModalVisible}
              animationType="slide"
              onRequestClose={handleClosePopup}
              transparent={true}
            >
              <View style={Styles.modalContainer}>
                <TouchableOpacity
                  onPress={handleClosePopup}
                  style={Styles.closeButton}
                >
                  <Ionicons name="close" size={30} color="#fff" />
                </TouchableOpacity>
                <View style={Styles.videoContainer}>
                  <YouTube
                    videoId={keyTrailer}
                    play={true}
                    loop={true}
                    height={400}
                    width={350}
                  />
                </View>
              </View>
            </Modal>
            <Text style={Styles.headingLeft}>NỘI DUNG</Text>
            <Text style={Styles.overview}>{translated}</Text>
            <View style={Styles.hr}></View>
            <View style={Styles.detailsContainer}>
              <View>
                <Text style={Styles.headingLeft}>Ngôn ngữ</Text>
                <Text style={{ ...Styles.textDetails, fontSize: 15 }}>
                  {language()}
                </Text>
              </View>
              <View>
                <Text style={Styles.headingLeft}>Trạng thái</Text>
                <Text style={Styles.textDetails}>{details.status}</Text>
              </View>
            </View>
            <View style={Styles.hr}></View>
            <View style={Styles.detailsContainer}>
              <View>
                <Text style={Styles.headingLeft}>Công chiếu</Text>
                <Text style={Styles.textDetails}>{details.first_air_date}</Text>
              </View>
              <View>
                <Text style={Styles.headingLeft}>Ngừng chiếu</Text>
                <Text style={Styles.textDetails}>{details.last_air_date}</Text>
              </View>
            </View>
            <View style={Styles.hr}></View>
            <Text style={Styles.headingLeft}>Thể loại</Text>
            <Text style={{ ...Styles.textDetails, marginBottom: 15 }}>
              {details.type}
            </Text>
            <View style={Styles.hr}></View>
            <Text style={Styles.headingLeft}>Kênh truyền hình</Text>
            <Text style={{ ...Styles.textDetails, marginBottom: 15 }}>
              {networks()}
            </Text>
            <View style={Styles.hr}></View>
            <View>
              <PersonInformation
                navigation={props.navigation}
                title="Diễn viên tham gia"
                url={`/tv/${props.route.params.tv_id}/credits`}
                type="cast"
              />
            </View>
            <View>
              <PersonInformation
                navigation={props.navigation}
                title="Tham gia sản xuất"
                url={`/tv/${props.route.params.tv_id}/credits`}
                type="crew"
              />
            </View>
            <View style={Styles.hr}></View>
            <TiviShow
              navigation={props.navigation}
              title="Chương trình tương tự"
              url={`/tv/${props.route.params.tv_id}/similar`}
            />
            <View style={Styles.hr}></View>
          </>
        )}
      </View>
    </ScrollView>
  );
};
export default TVDetails;
