const listeners = {};

export const endpoint = (document.location.protocol === 'http:' ? 'ws://' : 'wss://') + document.location.host;

const ws = new WebSocket(endpoint);

ws.onmessage = function onmessage(evt) {
  let data = {};
  try {
    data = JSON.parse(evt.data);
  } catch (e) {
    console.error('error parsing server message', e, evt.data);
    return;
  }
  if (!data.fn) {
    console.warn('ws function not defined');
    return;
  }
  if (listeners[data.fn]) {
    listeners[data.fn].forEach(cb => cb(data.from, data.payload));
  }
};

export function send(fn, to, payload) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({
      fn,
      to,
      payload,
    }));
  } else {
    console.warn('tried to send via ws but not connected yet');
  }
}


export function on(fn, cb) {
  if (!listeners[fn]) {
    listeners[fn] = [];
  }
  listeners[fn].push(cb);
}

export function off(fn) {
  if (listeners[fn]) {
    delete listeners[fn];
  }
}
