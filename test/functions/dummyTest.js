import lambda from '../../src/functions/dummy'

describe('dummy', () => {
  let context,
    event = { type: 'dummy' }

  beforeEach(() => {
    context = {
      fail: sinon.spy(),
      succeed: sinon.spy()
    }
  })

  it('should call context.succeed with the given event', () => {
    lambda(event, context)
    context.fail.called.should.be.false
    context.succeed.calledOnce.should.be.true
    context.succeed.calledWith(event).should.be.true
  })

  it('should call context.fail if no event is given', () => {
    lambda(null, context)
    context.succeed.called.should.be.false
    context.fail.calledOnce.should.be.true
    context.fail.calledWith('No event received').should.be.true
  })
})
