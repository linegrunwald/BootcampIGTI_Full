import ev from './events.js';

ev.on('testEvent', () => {
  console.log('ouvio também');
});

ev.emit('testEvent', 'bla bla bla');
