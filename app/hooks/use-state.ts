import { useState } from "react";

export const popupState = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = () => {setIsOpen(!isOpen)};

  return [isOpen, toggle];
};