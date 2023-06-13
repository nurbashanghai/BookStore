import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
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
          <View>
            <Text>{book.title}</Text>
            <Text>{JSON.stringify(book.authors[0])}</Text>
            <Text>{book.description}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {},
  container: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
});

export default BookPreviewScreen;
