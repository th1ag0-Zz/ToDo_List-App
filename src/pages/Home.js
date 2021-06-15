import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  FlatList,
} from "react-native";

import Button from "../components/Button";
import SkillCard from "../components/SkillCard";

function Home() {
  const [newSkill, setNewSkill] = useState("");
  const [mySkills, setMySkills] = useState([]);
  const [greeting, setGreeting] = useState("");

  function handleAddNewSkill() {
    if (!newSkill) {
      Alert.alert("Por favor, insira algum valor");
      return;
    }

    setMySkills([...mySkills, newSkill]);
    setNewSkill("");
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Bom dia!");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Boa tarde!");
    } else {
      setGreeting("Boa noite!");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{greeting} 😃</Text>

      <TextInput
        value={newSkill}
        style={styles.input}
        placeholder="new skill"
        placeholderTextColor="#777"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginTop: 40, marginBottom: 20 }]}>
        My skills:
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={(item) => Math.random()}
        renderItem={({ item }) => <SkillCard skill={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#121014",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  input: {
    marginTop: 30,
    backgroundColor: "#1f1e25",
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    color: "#fff",
  },
});

export default Home;
