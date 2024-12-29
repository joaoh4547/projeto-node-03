import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { verifyUseRole } from "@/http/middlewares/verify-user-role";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { nearby } from "./nearby";
import { search } from "./search";



export async function gymsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);
    app.get("/gyms/search", search);
    app.get("/gyms/nearby", nearby);
    app.post("/gyms", { onRequest: [verifyUseRole("ADMIN")] }, create);
}