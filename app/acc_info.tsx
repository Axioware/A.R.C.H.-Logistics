import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";

const AccountInfoPage = () => {
  const [firstname, setFirstName] = useState("Syed Hadeed");
  const [lastname, setLastName] = useState("Khalid");
  const [email, setEmail] = useState("prepprime.5@gmail.com");
  const [alternateemail, setAlternateEmail] = useState("hellheaven.20@gmail.com");
  const [maxAmount, setMaxAmount] = useState("100");
  const [phonenumber, setPhoneNumber] = useState("03352441890");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [printerOptions, setPrinterOptions] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    maxAmount: false,
  });

  const { width, height } = Dimensions.get("window");

  const isPortrait = height > width;

  useEffect(() => {
    setTimeout(() => {
      const mockData = [
        "Label Printer",
        "Barcode Printer",
        "Packing Slip Printer",
        "Thermal Printer",
        "Laser Printer",
      ];
      setPrinterOptions(mockData);
    }, 1000);
  }, []);

  const handleSave = () => {
    const newErrors = {
      firstname: !firstname,
      lastname: !lastname,
      email: !email,
      maxAmount: !maxAmount,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      Alert.alert("Please fill all required fields!");
      return;
    }

    setTimeout(() => {
      Alert.alert(
        "Account Information Saved",
        `Name: ${firstname} ${lastname}\nEmail: ${email}\nMax Amount: ${maxAmount}`
      );
    }, 1000);
  };

  const handleSubMenuClick = (field: string) => {
    setSelectedField(field);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { paddingHorizontal: isPortrait ? 20 : 40 }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Account Information</Text>
      </View>

      <View style={[styles.card, { padding: isPortrait ? 20 : 40 }]}>
        <ScrollView contentContainerStyle={styles.cardContent}>
          <Image
            style={[
              styles.profileImage,
              { width: width * 0.3, height: width * 0.3 },
            ]}
            source={{ uri: "https://via.placeholder.com/150" }}
          />
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>+ Upload Image</Text>
          </TouchableOpacity>

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={[styles.input, errors.firstname && styles.errorBorder]}
            value={firstname}
            onChangeText={(text) => setFirstName(text)}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={[styles.input, errors.lastname && styles.errorBorder]}
            value={lastname}
            onChangeText={(text) => setLastName(text)}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.errorBorder]}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Alternate Email</Text>
          <TextInput
            style={styles.input}
            value={alternateemail}
            onChangeText={(text) => setAlternateEmail(text)}
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Max Amount To Pick</Text>
          <TextInput
            style={[styles.input, errors.maxAmount && styles.errorBorder]}
            value={maxAmount}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) setMaxAmount(text);
            }}
            placeholder="Enter maximum amount"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phonenumber}
            onChangeText={(text) => {
              if (/^\d*$/.test(text)) setPhoneNumber(text);
            }}
            placeholder="Enter Phone Number"
            keyboardType="numeric"
          />

          {["Label Printer", "Barcode Printer", "Packing Slip Printer"].map(
            (field, index) => (
              <TouchableOpacity
                key={index}
                style={styles.subMenu}
                onPress={() => handleSubMenuClick(field)}
              >
                <Text style={styles.subMenuText}>{field}</Text>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { width: width * 0.9 }]}>
            <Text style={styles.modalHeader}>Select Printer</Text>
            <FlatList
              data={printerOptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (selectedField) {
                      Alert.alert(selectedField, `You selected: ${item}`);
                    } else {
                      Alert.alert("No Field Selected", "Please select a field first.");
                    }
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeModal}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginLeft: -40, // Adjust alignment
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    flex: 1,  // Ensures that card fills available space
  },
  cardContent: {
    paddingBottom: 0, // Ensures there's space at the bottom of the ScrollView
    alignItems: "center", // Centering the content within the ScrollView
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#D3D3D3",
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center", // Ensuring the text is centered inside the button
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
  subMenu: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginTop: 12,
    marginBottom: 12,
  },
  subMenuText: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  arrow: {
    fontSize: 16,
    color: "#999",
  },
  saveButton: {
    backgroundColor: "#32de84",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 350, // Increase size for the card
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalItem: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  closeModal: {
    marginTop: 20,
    alignItems: "center",
  },
  closeText: {
    color: "#007BFF",
    fontSize: 16,
  },
});

export default AccountInfoPage;
