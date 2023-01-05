const domain = "146.190.118.136";

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
  // bosh: `https://${domain}/http-bind?room=liveroom`,
  websocket: `wss://${domain}/xmpp-websocket`,
  clientNode: "http://jitsi.org/jitsimeet",
};
export const jitsiConfig0 = {
  hosts: {
    domain: "146.190.118.136",
    muc: "conference.146.190.118.136",
  },
  bosh: "//146.190.118.136",
  websocket: "wss://146.190.118.136/xmpp-websocket",
  openBridgeChannel: "websocket",
};
