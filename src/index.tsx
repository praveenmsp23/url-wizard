import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "./pages/popup";
import "./styles/globals.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Popup />);
