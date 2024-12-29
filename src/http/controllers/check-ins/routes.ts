import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUseRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { history } from "./history";
import { metrics } from "./metrics";
import { validate } from "./validate";

export function checkInsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);

    app.get("/check-ins/history", history);
    app.get("/check-ins/metrics", metrics);
    app.post("/gyms/:gymId/check-in", create);
    app.patch("/check-ins/:checkInId/validate", { onRequest: [verifyUseRole("ADMIN")] }, validate);
}