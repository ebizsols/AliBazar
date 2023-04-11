import React from "react";
import { Platform } from "react-native";

export function DropdownPickerInput() {
  React.useEffect(() => {
    console.warn(`DropdownPickerInput is not supported on: ${Platform.OS}`);
  }, []);
  return null;
}
