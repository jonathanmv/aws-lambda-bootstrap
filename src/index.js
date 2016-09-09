export const getEventType = event => {
  return event ? event.type : null
}

export const loadLambdaFunctionByEventType = eventType => {
  try {
    return require('./functions/' + eventType).default
  } catch (error) {
    console.log('No function found for event type: ' + eventType)
    return null
  }
}

export const handler = (event, context) => {
  const eventType = getEventType(event)
  const lambdaFunction = loadLambdaFunctionByEventType(eventType)
  if (!lambdaFunction) {
    context.fail('Unsupported event type: ' + eventType)
    return
  }

  try {
    lambdaFunction(event, context)
  } catch (error) {
    console.log('There was an error executing the function for the eventType: ' + eventType)
    context.fail(error)
  }
}
