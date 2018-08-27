const exitHandler = (options, err) => {
  if (options.cleanup) {
    process.stdout.write('clean');
  }
  if (err) {
    process.stdout.write(err.stack);
  }
  if (options.exit) {
    process.exit();
  }
};

process.stdin.resume();

// do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
