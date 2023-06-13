import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Link } from "react-router-native";

import { getListOfBooksBySubject } from "../../api";

type Book = {
  authors: { name: string; key: string }[];
  availability: { is_readable: boolean; is_previewable: boolean };
  title: string;
  cover_id: string;
  first_publish_year: string;
  has_fulltext: boolean;
  key: string;
};

const subjects = ["Love", "Detective", "Horror", "History"];

const HomeScreen = () => {
  const [list, setList] = useState<Book[]>([]);
  const [newArrivals, setNewArrivals] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState(0);

  const getList = async () => {
    setLoading(true);
    try {
      const { works } = await getListOfBooksBySubject(subjects[subject]);
      setList(works);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getNewArrivals = async () => {
    try {
      const { works } = await getListOfBooksBySubject("Science");
      setNewArrivals(works);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNewArrivals();
  }, []);

  useEffect(() => {
    getList();
  }, [subject]);

  const onSubjectChoose = (index: number) => {
    setSubject(index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.chooseGenre}>Please choose the genre:</Text>
      <FlatList
        data={subjects}
        renderItem={({ item, index }) => (
          <Text
            style={[
              styles.subject,
              index === subject && styles.selectedSubject,
            ]}
            id={item}
            onPress={() => onSubjectChoose(index)}
          >
            {item}
          </Text>
        )}
        horizontal
      />

      {loading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <FlatList
          data={list}
          style={styles.list}
          horizontal
          renderItem={({ item, index }) => (
            <Link
              to={{
                pathname: item.key,
                state: {
                  item,
                },
              }}
            >
              <View style={styles.book}>
                <Image
                  style={styles.cover}
                  source={{
                    uri: `https://picsum.photos/200/${index}00`,
                  }}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.authors[0].name}</Text>
              </View>
            </Link>
          )}
          keyExtractor={(item) => item.title}
        />
      )}

      <Text style={styles.newArrivals}>New Arrivals:</Text>
      <FlatList
        data={newArrivals}
        style={styles.list}
        horizontal
        renderItem={({ item, index }) => (
          <View style={styles.book}>
            <Image
              style={styles.cover}
              source={{
                uri: `https://picsum.photos/200/${index}00`,
              }}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.authors[0].name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.title}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  loader: {
    height: 280,
  },
  chooseGenre: {
    marginTop: 55,
    marginLeft: 15,
    color: "rgb(90,90,90)",
    margin: 12,
  },
  subject: {
    marginRight: 35,
    color: "rgb(90,90,90)",
    fontSize: 16,
    marginLeft: 15,
  },
  selectedSubject: {
    color: "black",
    fontWeight: "800",
    textShadowColor: "red",
    textShadowOffset: { width: 0, height: 15 },
    textShadowRadius: 10,
  },
  list: {
    marginTop: 35,
    display: "flex",
    flexDirection: "row",
  },
  book: {
    width: 130,
    marginRight: 20,
    marginLeft: 15,
  },
  cover: {
    width: "auto",
    height: 180,
    borderRadius: 20,
  },
  author: {
    color: "#9D9D9D",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  newArrivals: {
    marginLeft: 15,
    fontSize: 24,
    fontWeight: 800,
  },
});

export default HomeScreen;
