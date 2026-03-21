import { IS_DEV } from "usts:runtime";

if (IS_DEV) {
  console.log("[DEV] Hello world!");
} else {
  console.log("[PROD] Hello world!");
}
