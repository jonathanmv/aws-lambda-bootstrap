export const getEventType = event => {
  return event ? event.type : undefined
}

export const loadLambdaFunctionByEventType = eventType => {
  try {
    return require('./functions/' + eventType)
  } catch (error) {
    console.log('No function found for event type: ' + eventType)
    return null
  }
}

export default (event, context) => {
  const eventType = getEventType(event)
  const lambdaFunction = loadLambdaFunctionByEventType(eventType)
  if (!lambdaFunction) {
    context.fail('Unsupported event type: ' + eventType)
  }

  try {
    lambdaFunction(event, context)
  } catch (error) {
    console.log('There was an error executing the function for the eventType: ' + eventType)
    context.fail(error)
  }
}
