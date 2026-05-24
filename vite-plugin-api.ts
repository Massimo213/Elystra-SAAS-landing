import type { IncomingMessage, ServerResponse } from "http";
import type { Plugin } from "vite";
import { loadEnv } from "vite";

type ApiHandler = (req: any, res: any) => Promise<void>;

const API_ROUTES: Record<string, () => Promise<{ default: ApiHandler }>> = {
  "/api/reschedule": () => import("./api/reschedule"),
  "/api/demo-booking": () => import("./api/demo-booking"),
  "/api/demo-request": () => import("./api/demo-request"),
  "/api/demo-availability": () => import("./api/demo-availability"),
};

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      if (!data) {
        resolve(undefined);
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve(undefined);
      }
    });
    req.on("error", reject);
  });
}

function createMockResponse(res: ServerResponse) {
  let statusCode = 200;

  return {
    status(code: number) {
      statusCode = code;
      return this;
    },
    setHeader(key: string, value: string) {
      res.setHeader(key, value);
    },
    json(payload: unknown) {
      res.statusCode = statusCode;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(payload));
    },
    end() {
      res.statusCode = statusCode;
      res.end();
    },
  };
}

export function apiDevPlugin(): Plugin {
  return {
    name: "api-dev",
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.envDir, "");
      Object.assign(process.env, env);

      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split("?")[0];
        if (!pathname?.startsWith("/api/")) {
          next();
          return;
        }

        const loader = API_ROUTES[pathname];
        if (!loader) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: false, error: "API route not found" }));
          return;
        }

        try {
          const mod = await loader();
          const handler = mod.default;
          const mockRes = createMockResponse(res);

          const mockReq = {
            method: req.method,
            headers: req.headers,
            body: req.method === "POST" ? await readBody(req) : undefined,
          };

          await handler(mockReq, mockRes);
        } catch (err) {
          console.error("[api-dev]", pathname, err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: false, error: "Internal server error" }));
        }
      });
    },
  };
}
