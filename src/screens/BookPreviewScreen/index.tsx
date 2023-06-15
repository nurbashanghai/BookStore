import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link, useParams, useLocation } from "react-router-native";

import { getBookPreview } from "../../api";

const BookPreviewScreen = () => {
  const params = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<any>(null);

  const fetchPreview = async (id: string) => {
    setLoading(true);
    try {
      const res = await getBookPreview(id);
      setBook(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params && params.id) {
      fetchPreview(params.id);
    }
  }, [params]);

  return (
    <View style={styles.container}>
      <Link to="/">
        <AntDesign
          name="arrowleft"
          size={35}
          color="black"
          style={styles.backButton}
        />
      </Link>
      <ScrollView>
        {book && location.state && (
          <View style={styles.book} >
            <Image
              style={styles.cover}
              source={{
                uri: `https://picsum.photos/200/300`,
              }}
            />
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>Author</Text>
            <View style={styles.stars}>
              <AntDesign name="star" size={24} color="black" />
              <AntDesign name="star" size={24} color="black" />
              <AntDesign name="star" size={24} color="black" />
              <AntDesign name="star" size={24} color="black" />
              <AntDesign name="staro" size={24} color="black" />
            </View>
            <Text style={styles.description}>{JSON.stringify(book.description)}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {},
  container: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  book: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    height: 300,
    width: 200,
    borderRadius: 50,
  },
  author: {
    color: "#9D9D9D",
    marginTop: 10,
  },
  stars: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  description: {
    marginTop: 15,
  }
});

export default BookPreviewScreen;
