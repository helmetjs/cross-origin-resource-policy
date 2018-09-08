var crossOriginResourcePolicy = require('..')
var assert = require('assert')
var connect = require('connect')
var supertest = require('supertest')

describe('crossOriginResourcePolicy', function () {
  function makeApp (middleware) {
    var result = connect()
    result.use(middleware)
    result.use(function (req, res) {
      res.end('Hello world!')
    })
    return result
  }

  it('sets the header value to same-origin with no argument', function () {
    var app = makeApp(crossOriginResourcePolicy())
    return supertest(app).get('/')
      .expect('Cross-Origin-Resource-Policy', 'same-origin')
      .expect('Hello world!')
  })

  it('sets the header value to same-origin with an empty object argument', function () {
    var app = makeApp(crossOriginResourcePolicy({}))
    return supertest(app).get('/')
      .expect('Cross-Origin-Resource-Policy', 'same-origin')
      .expect('Hello world!')
  })

  it('can set the value to same-origin', function () {
    var app = makeApp(crossOriginResourcePolicy({ policy: 'same-origin' }))
    return supertest(app).get('/')
      .expect('Cross-Origin-Resource-Policy', 'same-origin')
      .expect('Hello world!')
  })

  it('can set the value to same-site', function () {
    var app = makeApp(crossOriginResourcePolicy({ policy: 'same-site' }))
    return supertest(app).get('/')
      .expect('Cross-Origin-Resource-Policy', 'same-site')
      .expect('Hello world!')
  })

  it('errors with other values', function () {
    [
      undefined,
      null,
      '',
      'bogus',
      'SAME-ORIGIN'
    ].forEach(function (policy) {
      assert.throws(function () {
        crossOriginResourcePolicy({ policy: policy })
      })
    })
  })

  it('names its function and middleware', function () {
    assert.strict.equal(crossOriginResourcePolicy.name, 'crossOriginResourcePolicy')
    assert.strict.equal(crossOriginResourcePolicy().name, 'crossOriginResourcePolicy')
  })
})
