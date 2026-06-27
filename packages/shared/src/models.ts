export type ModelPricing = {
  inputUsedPerMillionTokens: number;
  outputUsedPerMillionTokens: number;
};

export type SupportedProvider = "anthropic" | "openai" | "azure" | "google";

type SupportedChatModelDefinition = {
  id: string;
  provider: SupportedProvider;
  pricing: ModelPricing;
};

export const SUPPORTED_CHAT_MODELS = [
  {
    id: "claude-sonnet-4-6",
    provider: "anthropic",
    pricing: {
      inputUsedPerMillionTokens: 3,
      outputUsedPerMillionTokens: 15,
    },
  },
  {
    id: "claude-haiku-4-5",
    provider: "anthropic",
    pricing: {
      inputUsedPerMillionTokens: 1,
      outputUsedPerMillionTokens: 5,
    },
  },
  {
    id: "claude-opus-4-6",
    provider: "anthropic",
    pricing: {
      inputUsedPerMillionTokens: 5,
      outputUsedPerMillionTokens: 25,
    },
  },
  {
    id: "gpt-5.4",
    provider: "openai",
    pricing: {
      inputUsedPerMillionTokens: 2.5,
      outputUsedPerMillionTokens: 15,
    },
  },
  {
    id: "gpt-5.4-mini",
    provider: "openai",
    pricing: {
      inputUsedPerMillionTokens: 0.75,
      outputUsedPerMillionTokens: 4.5,
    },
  },
  {
    id: "gpt-5.4-nano",
    provider: "openai",
    pricing: {
      inputUsedPerMillionTokens: 0.2,
      outputUsedPerMillionTokens: 1.25,
    },
  },
  {
    id: "aicloud-gpt-5.2-chat",
    provider: "azure",
    pricing: {
      inputUsedPerMillionTokens: 1.75,
      outputUsedPerMillionTokens: 14,
    },
  },
  {
    id: "aicloud-gpt-5.4",
    provider: "azure",
    pricing: {
      inputUsedPerMillionTokens: 2.5,
      outputUsedPerMillionTokens: 15,
    },
  },
  {
    id: "gemini-2.5-flash",
    provider: "google",
    pricing: {
      inputUsedPerMillionTokens: 1,
      outputUsedPerMillionTokens: 2.5,
    },
  },
] as const satisfies readonly SupportedChatModelDefinition[];

export type SupportedChatModel = (typeof SUPPORTED_CHAT_MODELS)[number];
export type SupportedChatModelId = SupportedChatModel["id"];

export function findSupportedChatModel(modelId: string) {
  return SUPPORTED_CHAT_MODELS.find((model) => model.id === modelId);
}

export const DEFAULT_CHAT_MODEL_ID: SupportedChatModelId = "claude-sonnet-4-6";
