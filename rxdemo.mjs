/********************************************************************
*
********************************************************************/
import {fromEvent} from 'rxjs';
import events from 'events'

// The Emitter
const stateEmitter = new events.EventEmitter();
// The Payload
const payload = {
  state: '',
  stateEvents:[]
}
// The Process Steps - In sequence
let process = ['doProjects', 
               'doProjectPipelines', 
               'doProjectPipelineDetails', 
               'doPackage',
               'end']

/**
 * doProjects load
 */
const doProjects = fromEvent(stateEmitter, 'doProjects');
const subscribe1 = doProjects.subscribe((val) => {
  // Place your Code here Async or Sync 
  setTimeout(() => {
    console.log('from subscribe1 doing:', val.state)
    val.stateEvents.push(val.state)
    let nextState = process.shift()
    payload.state = nextState
    console.log('from subscribe1 next:', nextState) 
    stateEmitter.emit(nextState, payload);
    subscribe1.unsubscribe()
  }, 100);

});

/**
 * doProjectPipelines load
 */
const doProjectPipelines = fromEvent(stateEmitter, 'doProjectPipelines');
const subscribe2 = doProjectPipelines.subscribe((val) => {
  // Place your Code here Async or Sync 
  setTimeout(() => {
    console.log('from subscribe2 doing:', val.state)
    val.stateEvents.push(val.state)
    let nextState = process.shift()
    payload.state = nextState
    console.log('from subscribe2 next:', nextState) 
    stateEmitter.emit(nextState, payload);
    subscribe2.unsubscribe()
  }, 100);

});

/**
 * doProjectPipelineDetails
 */
const doProjectPipelineDetails = fromEvent(stateEmitter, 'doProjectPipelineDetails');
const subscribe3 = doProjectPipelineDetails.subscribe((val) => {
  // Place your Code here Async or Sync 
  setTimeout(() => {
    console.log('from subscribe3 doing:', val.state)
    val.stateEvents.push(val.state)
    let nextState = process.shift()
    payload.state = nextState
    console.log('from subscribe3 next:', nextState) 
    stateEmitter.emit(nextState, payload);
    subscribe3.unsubscribe()
  }, 100);
});

/**
 * doPackage
 */
const doPackage = fromEvent(stateEmitter, 'doPackage');
const subscribe4 = doPackage.subscribe((val) => {
  // Place your Code here Async or Sync 
  setTimeout(() => {
    console.log('from subscribe4 doing:', val.state)
    val.stateEvents.push(val.state)
    val.stateEvents.push('end')
    let nextState = process.shift()
    payload.state = nextState
    console.log('from subscribe4 next:', nextState) 
    stateEmitter.emit(nextState, payload);
    console.log('End of process, states completed:',val.stateEvents)
    subscribe4.unsubscribe()
  }, 100);
});

/*************************************************************
 * Mainline execution point - Start here
 * 
 * Event Driven coordinated process cycle
 * 
 *************************************************************/

// Seed the Payload
payload.state = 'doProjects'
payload.message = 'Next state: doProjectPipelines'

// Emit first event - Each event will trigger the next
console.log(`Starting the process:`, process)
stateEmitter.emit(process.shift(), payload);


/**
 * doPackage is the last subscriber in the process
 *
