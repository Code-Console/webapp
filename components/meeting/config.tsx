const domain = "meet.jit.si";

export const jitsiConfig = {
  hosts: {
    domain: domain,
    muc: `conference.${domain}`,
  },
  bosh: `//${domain}//http-bind`,
  externalConnectUrl: `https://${domain}/http-pre-bind`,
  enableP2P: true,
  p2p: {
    enabled: true,
    preferH264: true,
    disableH264: true,
    useStunTurn: true,
  },
  useStunTurn: true,
  websocket: `wss://${domain}/xmpp-websocket`,
  clientNode: "http://jitsi.org/jitsimeet",
};
