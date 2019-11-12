declare namespace Max {
  type JSONPrimitive = string | number | boolean | null;
  type JSONValue = JSONPrimitive | JSONObject | JSONArray;
  type JSONObject = { [member: string]: JSONValue };
  interface JSONArray extends Array<JSONValue> {}
  export type MaxFunctionHandler = (...args: any[]) => void;
  export type MaxMessageType = 'all' | 'bang' | 'dict' | 'number' | 'list';
  export type MaxPostLevel = 'error' | 'info' | 'warn';

  type MaxDictIdentifier = string;
  type MaxDictPath = string;

  export interface API {
    // Dictionaries
    getDict(id: MaxDictIdentifier): Promise<JSONObject>;
    setDict(id: MaxDictIdentifier, dict: JSONObject): Promise<JSONObject>;
    updateDict(
      id: MaxDictIdentifier,
      updatePath: MaxDictPath,
      updateValue: JSONValue
    ): Promise<JSONObject>;
    // Handlers
    addHandler(selector: string, callback: MaxFunctionHandler): void;
    addHandlers(handlers: { [selector: string]: MaxFunctionHandler }): void;
    removeHandler(selector: string, callback: MaxFunctionHandler): void;
    removeHandlers(selector: string): void;
    outlet(...args: JSONValue[]): Promise<null>;
    outletBang(): Promise<null>;
    post(...args: any[]): Promise<null>;
    close(): Promise<null>;
    destroy(): Promise<null>;
    listen(): Promise<JSONObject>;
  }
}
