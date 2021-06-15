import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

function SkillCard({ skill }) {
  return (
    <TouchableOpacity style={styles.buttonSkill} activeOpacity={0.8}>
      <Text style={styles.textSkill}>{skill}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonSkill: {
    backgroundColor: "#1f1e25",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },

  textSkill: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SkillCard;
