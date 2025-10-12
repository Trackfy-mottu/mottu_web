import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Auth } from "../screens/BikesForm";
import { useTheme } from "../services/ThemeContext";

interface AddPendingModalProps {
  addModalVisible: boolean;
  setAddModalVisible: (visible: boolean) => void;
  placa: string;
  onPendingCreated?: () => void;
}

export default function AddPendingModal({
  addModalVisible,
  setAddModalVisible,
  placa,
  onPendingCreated,
}: AddPendingModalProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [description, setDescription] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [auth, setAuth] = useState<Auth>();
  const [error, setError] = useState<string>();
  const { t } = useTranslation();

  const useAuth = async () => {
    const data = await AsyncStorage.getItem("@dadosUsuario");
    if (!data) return;
    const { token, username, role, court } = JSON.parse(data);
    setAuth({ token, username, role, court });
  };

  const createPending = async () => {
    if (!auth) return;
    if (!description || !status) {
      Alert.alert("Erro", t("addPendingModal.formErrorMessage"));
      return;
    }
    try {
      const newPending = {
        number: 3,
        description,
        status,
        bike: {
          placa: placa,
        },
      };

      await axios.post("http://192.168.0.21:8080/api/pendings", newPending, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      Alert.alert("Sucesso", t("addPendingModal.successMessage"));
      setStatus("");
      setDescription("");
      setAddModalVisible(false);
      if (onPendingCreated) onPendingCreated();
    } catch (error) {
      Alert.alert("Erro", t("addPendingModal.errorMessage"));
    }
  };

  useEffect(() => {
    useAuth();
  }, []);

  return (
    <Modal
      visible={addModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setAddModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {t("addPendingModal.modalTitle")}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={t("addPendingModal.descriptionInputLabel")}
            placeholderTextColor="#888"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <View style={{ width: 220, marginBottom: 10 }}>
            <Picker
              selectedValue={status}
              onValueChange={(value) => setStatus(value)}
              style={{
                color: colors.text,
                backgroundColor: colors.background,
              }}
              dropdownIconColor={colors.text}
            >
              <Picker.Item
                label={t("addPendingModal.inputPlaceholder")}
                value=""
              />
              <Picker.Item
                label={t("addPendingModal.statusOption1")}
                value="Pendente"
              />
              <Picker.Item
                label={t("addPendingModal.statusOption2")}
                value="EmAndamento"
              />
              <Picker.Item
                label={t("addPendingModal.statusOption3")}
                value="Resolvido"
              />
            </Picker>
          </View>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAddModalVisible(false)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {t("addPendingModal.cancelButton")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: "#007bff" }]}
              onPress={() => createPending()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {t("addPendingModal.addButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    addPendingButton: {
      marginTop: 8,
      backgroundColor: "#00A431",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    addPendingButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },
    input: {
      width: 220,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 6,
      padding: 8,
      marginBottom: 10,
      color: colors.text,
      backgroundColor: colors.background,
    },
    closeButton: {
      marginTop: 15,
      backgroundColor: "#00A431",
      paddingVertical: 8,
      paddingHorizontal: 25,
      borderRadius: 8,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      padding: 20,
      width: "85%",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: colors.text,
    },
  });
