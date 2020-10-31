const EventEmitter = {
  events: {},
  emit: function (event, data) {
    this.events[event] ? this.events[event]() : console.error(`event '${event}' does not exist`);
  },
  subscribe: function (event, callback) {
    this.events[event] = callback;
  }
};

export default EventEmitter;
