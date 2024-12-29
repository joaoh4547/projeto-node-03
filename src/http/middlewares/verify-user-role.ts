import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUseRole(verifyRole : "ADMIN" | "MEMBER" ) {
    return async (req: FastifyRequest, reply: FastifyReply) =>  {
        const {role} = req.user;
        if(role !== verifyRole){
            return reply.status(401).send({ message: "Unauthorized" });
        }
    }; 
} 