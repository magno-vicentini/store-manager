const sinon = require('sinon');
const { expect } = require('chai');

const salesControllers = require('../../../controllers/salesControllers');
const salesServices = require('../../../services/salesServices');

describe('When called controller getAll', () => {
  let request = {}, response = {};

  describe('When the service returns an array with the sales', () => {
    before(() => {
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns([])
      sinon.stub(salesServices, 'getAll').resolves([])
    })

    after(() => {
      salesServices.getAll.restore()
    })
    it('res.status() with status 200', async () => {
      await salesControllers.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    })

    it('res.json() with array', async () => {
      await salesControllers.getAll(request, response)

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true)
    })
  })
})

describe('When called controller getById', () =>  {
  let request = {}, response = {};
  describe('If "id" doesnt exist ', () => {
    before(() => {
      request.params = { id: 10}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({ message: 'Sale not found' })
      sinon.stub(salesServices, 'getById').resolves([])
    })

    after(() => {
      salesServices.getById.restore()
    })

    it('res.status() with status 404', async () => {
      await salesControllers.getById(request, response)

      expect(response.status.calledWith(404)).to.be.equal(true)
    })

    it('res.json() return an object', async () => {
      await salesControllers.getById(request, response)

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

  })
  describe('If "id" exist return array', () => {
    before(() => {
      request.params = {id: 1}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({})
      sinon.stub(salesServices, 'getById').resolves([{}])
    })

    after(() => {
      salesServices.getById.restore()
    })

    it('res.status() with status 200', async () => {
      await salesControllers.getById(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    })

    it('res.json() return object', async () => {
      await salesControllers.getById(request, response)

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })
  })
})

describe('When called controller createSale', () => {
  let request = {}, response = {};
  describe('When the Sale is created', () => {
    before(() => {
      request.body = []
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({id: 2, itemsSold: []})
      sinon.stub(salesServices, 'createSale').resolves({id: 2, itemsSold: []})
    })

    after(() => {
      salesServices.createSale.restore()
    })

    it('res.status() with status 201', async () => {
      await salesControllers.createSale(request, response) 

      expect(response.status.calledWith(201)).to.be.equal(true)
    })

    it('res.json() receive object with properties', async () => {
      await salesControllers.createSale(request, response) 

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
      expect(response.json()).to.have.property('id')
      expect(response.json()).to.have.property('itemsSold')
    })
  })
})

describe('When called controller updateSale', () => {
  let request = {}, response = {};
  describe('When "id" doesnt exist', () => {
    before(() => {
      request.params = {id: 10}
      request.body = []
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({ message: 'Sale not found' })
      sinon.stub(salesServices, 'getById').resolves([])
    })

    after(() => {
      salesServices.getById.restore()
    })

    it('res.status() with status 404', async () => {
      await salesControllers.updateSale(request, response) 

      expect(response.status.calledWith(404)).to.be.equal(true)
    })

    it('res.json() receive an object', async () => {
      await salesControllers.updateSale(request, response) 

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })
  })
  describe('When the Sale is updated', () => {
    before(() => {
      request.params = {id: 1}
      request.body = []
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({saleId: 1, itemUpdated: []})
      sinon.stub(salesServices, 'getById').resolves([{}])
      sinon.stub(salesServices, 'updateSale').resolves({saleId: 1, itemUpdated: []})
    })

    after(() => {
      salesServices.getById.restore()
      salesServices.updateSale.restore()
    })

    it('res.status() with status 200', async () => {
      await salesControllers.updateSale(request, response) 

      expect(response.status.calledWith(200)).to.be.equal(true)
    })

    it('res.json() receive an object', async () => {
      await salesControllers.updateSale(request, response) 

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
      expect(response.json()).to.have.property('saleId')
      expect(response.json()).to.have.property('itemUpdated')
    })
  })
})