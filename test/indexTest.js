import {handler, getEventType, loadLambdaFunctionByEventType} from '../src/index'

describe('index', () => {
  let expected,
    actual

  beforeEach(() => {
    expected = undefined
    actual = undefined
  })

  describe('getEventType', () => {
    it('should return the type property', () => {
      expected = 'dummy'
      actual = getEventType({ type: expected })

      actual.should.equal(expected)
    })
    it('should return null if the type property is not present', () => {
      actual = getEventType()
      expect(actual).to.be.null
    })
  })

  describe('loadLambdaFunctionByEventType', () => {
    it('should return null if no function can be found', () => {
      actual = loadLambdaFunctionByEventType()
      expect(actual).to.be.null
    })

    it('should return the function with the given name', () => {
      actual = loadLambdaFunctionByEventType('dummy')
      actual.should.be.a('function')
    })
  })

  describe('handler', () => {
    let context

    beforeEach(() => {
      context = {
        fail: sinon.spy(),
        succeed: sinon.spy()
      }
    })

    it('should call context.fail if cannot find a function for the given event type', () => {
      handler({type: 'invalid'}, context)
      context.succeed.called.should.be.false
      context.fail.calledOnce.should.be.true
      context.fail.calledWith('Unsupported event type: invalid').should.be.true
    })

    // This test is not testing that the function is called with event and context
    // TODO Implement stubbing for the loadLambdaFunctionByEventType
    // https://www.exratione.com/2015/12/es6-use-of-import-property-from-module-is-not-a-great-plan/
    it('should call the function with the given event and context', () => {
      const event = { type: 'dummy' }
      handler(event, context)
      context.fail.called.should.be.false
      context.succeed.calledOnce.should.be.true
      context.succeed.calledWith(event).should.be.true
    })

    it('should call context.fail with the thrown error if the function throws an error')
  })
})
