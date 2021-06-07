type JSONType = string | number | boolean | null;
type JSONValueType = JSONType | JSONType[];
interface JSONObject {
  [index: string]: JSONValueType;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
