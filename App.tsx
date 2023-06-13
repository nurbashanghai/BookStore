import React from "react";
import { NativeRouter, Route, Routes } from "react-router-native";

import BottomTabNavigator from "./src/modules/BottomNavigation";
import BookPreviewScreen from "./src/screens/BookPreviewScreen";

const App = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<BottomTabNavigator />} />
        <Route path="/works/:id" element={<BookPreviewScreen />} />
      </Routes>
    </NativeRouter>
  );
};

export default App;
