"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@trpc/server/adapters/standalone");
const zod_1 = __importDefault(require("zod"));
const trpc_1 = require("./trpc");
const cors_1 = __importDefault(require("cors"));
const appRouter = (0, trpc_1.router)({
    greeting: trpc_1.publicProcedure
        .input(zod_1.default.object({ name: zod_1.default.string() }))
        .query((req) => {
        // const { input } = req
        return {
            text: `Hello ${req.input.name}`,
        };
    }),
    hello: trpc_1.publicProcedure
        // using zod schema to validate and infer input values
        .input(zod_1.default
        .object({
        text: zod_1.default.string().nullish(),
    })
        .nullish())
        .query(({ input }) => {
        var _a;
        return {
            greeting: `hello ${(_a = input === null || input === void 0 ? void 0 : input.text) !== null && _a !== void 0 ? _a : 'world'}`,
        };
    }),
    '': trpc_1.publicProcedure.query(() => {
        return {
            data: 'hello world',
        };
    }),
});
const { listen } = (0, standalone_1.createHTTPServer)({
    middleware: (0, cors_1.default)(),
    router: appRouter,
});
// The API will now be listening on port 3000!
listen(3000);
