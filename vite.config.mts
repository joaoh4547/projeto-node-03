import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins:[
        tsConfigPaths()
    ],
    test: {
        globals: true,
        coverage: {
            all: false,
        },
        environmentMatchGlobs:[
            ["src/http/controllers/**","prisma"]
        ]
    },
});