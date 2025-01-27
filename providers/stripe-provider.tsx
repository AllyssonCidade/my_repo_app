import { StripeProvider } from "@stripe/stripe-react-native";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import * as Linking from "expo-linking";

interface Props {
  children: ReactElement;
}

export default function ComponentStripeProvider({ children }: Props) {
  const [publishableKey, setPublishableKey] = useState("");

  const fetchPublishableKey = async () => {
    const key =
      "pk_test_51QkUheBA5BcP57GviS3plgfZThSquTyJHAIy6Ww6kNN9Ttk11zqfRrjTS4ypqYhYGtosoOKMOBsKjYTVPCeJCFVE00dPFXMZpE";
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      urlScheme={Linking.createURL("/")?.split(":")[0]}
    >
      {children}
    </StripeProvider>
  );
}
