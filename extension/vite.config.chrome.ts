import { defineConfig } from "vite";
import { getConfig } from "./vite.config.shared.js";

export default defineConfig(getConfig("chrome"));
