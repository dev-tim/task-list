export function sinonRespond(sinonFakeServer) {
  // respond on next tick
  setTimeout(()=> {
    sinonFakeServer.respond();
  }, 0);
}
