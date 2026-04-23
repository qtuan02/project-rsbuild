import path from "node:path";
import { fileURLToPath } from "node:url";

import { mergeRsbuildConfig } from "@rsbuild/core";

import type { StorybookConfig } from "storybook-react-rsbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/components/stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "storybook-react-rsbuild",
    options: {
      builder: {
        rsbuildConfigPath: path.resolve(__dirname, "../rsbuild.config.ts"),
      },
    },
  },
  rsbuildFinal: async (rsbuildConfig) => {
    return mergeRsbuildConfig(rsbuildConfig, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
        },
      },
      output: {
        assetPrefix: "/storybook/",
      },
    });
  },
};

export default config;
