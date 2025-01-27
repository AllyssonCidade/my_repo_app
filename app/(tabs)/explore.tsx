import { View, Button, Alert, TextInput, ScrollView } from "react-native";
import { useState, useCallback } from "react";
import { ThemedText } from "@/components/ThemedText";
import { useStripe } from "@stripe/stripe-react-native";
import { fetchPaymentSheetParams } from "@/api/api";
import Sliders from "@/components/ui/slider";
import { Avatar } from "@rneui/themed";
export default function TabTwoScreen() {
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
    } else {
      Alert.alert("Success", "Your order is confirmed!");
      setLoading(false);
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        gap: 26,
        padding: 16,
        marginTop: 50,
      }}
    >
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        <Avatar
          size={104}
          rounded
          source={{ uri: "https://github.com/AllyssonCidade.png" }}
          title="Allysson Cidade"
        />
      </View>

      <View style={{ width: "100%", gap: 8 }}>
        <ThemedText style={{ fontSize: 20, textAlign: "center" }}>
          Contribuir
        </ThemedText>

        <View>
          <ThemedText>Nome:</ThemedText>
          <TextInput
            onChangeText={setName}
            value={name}
            style={{
              backgroundColor: "#61606073",
              borderRadius: 8,
              color: "#f5f5f5",
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
              color: "#f5f5f5",
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
              color: "#f5f5f5",
            }}
          />
        </View>
        <Sliders onVChange={setPrice} value={price} />
        <ThemedText
          style={{ color: "#f5f5f5", fontSize: 24, textAlign: "center" }}
        >
          R$ {Math.floor(price)},00
        </ThemedText>
        <Button disabled={loading} title="Cartão" onPress={openPaymentSheet} />
      </View>
    </ScrollView>
  );
}
