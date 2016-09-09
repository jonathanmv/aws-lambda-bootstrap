import Index, {getEventType, loadLambdaFunctionByEventType} from '../src/index'

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
    it('should return undefined if the type property is not present', () => {
      actual = getEventType()
      should.not.exist(actual);
    })
  })

  describe('loadLambdaFunctionByEventType', () => {
    it('should return null if no function can be found', () => {
      expected = null
      actual = loadLambdaFunctionByEventType()
      expect(actual).to.be(expected)
    })
  })
})
