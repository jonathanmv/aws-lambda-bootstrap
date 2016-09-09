export default const dummy = (event, context) => {
  console.log('Executing dummy function')
  if (event) {
    console.log('I got an event')
    context.succeed(event)
  } else {
    console.log('I did not get any event')
    context.fail('No event received')
  }
}
