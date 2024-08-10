import uWS from "uWebSockets.js";

const port = 9001;

interface Context {
  localId: string;
  socket: any;
}

interface Code {
  raw: number;
}

let codetable = new Map<number, Context>();

function createCode() {
  let code = Math.floor(100000 + Math.random() * 900000);

  while (codetable.has(code)) {
    code = Math.floor(100000 + Math.random() * 900000);
  }

  return code;
}

const app = uWS
  .App()
  .ws<Code>("/*", {
    /* options */
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,

    /* handlers */
    open: (ws) => {
      ws.getUserData().raw = 0;
    },
    message: (ws, message, isBinary) => {
      // binary data is unsupported
      if (isBinary) {
        return;
      }

      const req = JSON.parse(new TextDecoder().decode(message));

      switch (req.type) {
        // host wants to start sending...
        case "connect-host":
          const code = createCode();

          ws.getUserData().raw = code;

          codetable.set(code, {
            localId: req.localId,
            socket: ws,
          });

          ws.send(
            JSON.stringify({
              status: "success-host",
              code: code,
            })
          );

          break;

        // user wants to connect to host...
        case "connect-user":
          let conn = codetable.get(parseInt(req.code));

          if (conn === undefined) {
            console.log("stardropd: invalid code " + req.code);

            ws.send(
              JSON.stringify({
                status: "error",
                message: "invalid code",
              })
            );

            break;
          }

          conn.socket.send(
            JSON.stringify({
              status: "connected",
              remoteId: req.remoteId,
            })
          );

          break;

        // user wants to start connection with host...
        case "get-local-id":
          let ctx = codetable.get(parseInt(req.code));

          if (ctx === undefined) {
            console.log("stardropd: invalid code " + req.code);

            ws.send(
              JSON.stringify({
                status: "error",
                message: "invalid code",
              })
            );

            break;
          }

          ws.send(
            JSON.stringify({
              status: "success-local-id",
              localId: ctx.localId,
            })
          );

          break;
      }
    },
    drain: (ws) => {
      console.log("stardropd: WebSocket backpressure: " + ws.getBufferedAmount());
    },
    close: (ws, code, message) => {
      const key = ws.getUserData().raw;

      if (key !== 0) {
        codetable.delete(key);
      }
    },
  })
  .any("/*", (res, req) => {
    res.end("Invalid Request!");
  })
  .listen(port, (token) => {
    if (token) {
      console.log("stardropd: listening to port " + port);
    } else {
      console.log("stardropd: failed to listen to port " + port);
    }
  });
