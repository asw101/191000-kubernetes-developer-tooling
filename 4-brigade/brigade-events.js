const { events, Job } = require("brigadier");

events.on("simpleevent", (e, p) => {  // handler for a SimpleEvent
  var echo = new Job("echosimpleevent", "alpine:3.8");
  echo.tasks = [
    "echo Project " + p.name,
    "echo event type: $EVENT_TYPE"
  ];
  echo.env = {
    "EVENT_TYPE": e.type
  };
  echo.run();
});

events.on("cloudevent", (e, p) => { // handler for a CloudEvent
  var echo = new Job("echocloudevent", "alpine:3.8");
  echo.tasks = [
    "echo Project " + p.name,
    "echo event type: $EVENT_TYPE"
  ];
  echo.env = {
    "EVENT_TYPE": e.type
  };
  echo.run();
});

events.on("exec", () => {
  var job = new Job("do-nothing", "alpine:3.8");
  job.tasks = [
    "echo Hello",
    "echo World"
  ];

  job.run();
});
