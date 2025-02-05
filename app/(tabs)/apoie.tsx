import {
  View,
  Button,
  Alert,
  TextInput,
  useColorScheme,
  ImageBackground,
} from "react-native";
import { useState, useCallback } from "react";
import { ThemedText } from "@/components/ThemedText";
import { useStripe } from "@stripe/stripe-react-native";
import { fetchPaymentSheetParams } from "@/api/api";
import Sliders from "@/components/ui/slider";
import { Colors } from "@/constants/Colors";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Warning: Slider: Support for defaultProps will be removed from function components in a future major release.",
]);

export default function ApoieScreen() {
  const colorScheme = useColorScheme();
  const [price, setPrice] = useState<number>(50);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const initializePaymentSheet = useCallback(
    async (price: number) => {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams(Math.floor(price), name, email, phone);

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Allysson Cidade",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: name,
          email: email,
          phone: phone,
        },
      });

      if (!error) {
        setLoading(true);
      } else {
        Alert.alert(`Error code: ${error.code}`, error.message);
      }
    },
    [initPaymentSheet, name, email, phone]
  );

  const openPaymentSheet = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Por favor, preencha todos os campos antes de continuar.");
      return;
    }
    await initializePaymentSheet(price);
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      setLoading(false);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
      setLoading(false);
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/f.jpg")}
      resizeMode="cover"
      imageStyle={{ opacity: colorScheme === "dark" ? 0.3 : 0.5 }}
      style={{
        flex: 1,
        justifyContent: "center",
        paddingTop: 50,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <ThemedText
        style={{
          fontSize: 24,
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        Contribuir
      </ThemedText>
      <View style={{ paddingHorizontal: 16, gap: 12 }}>
        <View>
          <ThemedText>Nome:</ThemedText>
          <TextInput
            onChangeText={setName}
            value={name}
            style={{
              backgroundColor: "#61606073",
              borderRadius: 8,
              color: Colors[colorScheme!].text,
            }}
          />
        </View>
        <View>
          <ThemedText>E-mail:</ThemedText>
          <TextInput
            onChangeText={setEmail}
            value={email}
            style={{
              backgroundColor: "#61606073",
              borderRadius: 8,
              color: Colors[colorScheme!].text,
            }}
          />
        </View>
        <View>
          <ThemedText>Telefone:</ThemedText>
          <TextInput
            onChangeText={setPhone}
            value={phone}
            style={{
              backgroundColor: "#61606073",
              borderRadius: 8,
              color: Colors[colorScheme!].text,
            }}
          />
        </View>
        <Sliders onVChange={setPrice} value={price} />
        <ThemedText style={{ fontSize: 24, textAlign: "center" }}>
          R$ {Math.floor(price)},00
        </ThemedText>
        <Button disabled={loading} title="Cartão" onPress={openPaymentSheet} />
      </View>
    </ImageBackground>
  );
}
