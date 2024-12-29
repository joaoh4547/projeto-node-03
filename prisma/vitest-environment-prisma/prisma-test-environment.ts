import { Environment } from "vitest/environments";

export default <Environment>{
    name: "prisma",
    async  setup() {
        console.log("Setup");
        return {
            async teardown(){
                console.log("Teardown");
            }
        };
    },
    transformMode: "ssr"
};