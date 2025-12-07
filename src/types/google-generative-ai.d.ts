import '@google/generative-ai';

declare module '@google/generative-ai' {
  export interface FunctionDeclarationsTool {
    googleSearch?: {};
  }
}
