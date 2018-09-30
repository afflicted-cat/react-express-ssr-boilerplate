// tslint:disable: no-any no-console
const exitHandler = options => err => {
  if (err && err.stack) {
    process.stdout.write(err.stack);
  }
  if (options.exit) {
    process.exit();
  }
};

process.stdin.resume();

// catches ctrl+c event
process.on('SIGINT', exitHandler({ exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler({ exit: true }));
process.on('SIGUSR2', exitHandler({ exit: true }));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler({ exit: true }));
process.on('unhandledRejection', exitHandler({ exit: false }));
