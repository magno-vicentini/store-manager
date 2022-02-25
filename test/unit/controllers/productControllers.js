const sinon = require('sinon');
const { expect } = require('chai');

const productsControllers = require('../../../controllers/productsControllers');
const productsServices = require('../../../services/productsServices');

describe('When called controller getAll', () => {
  let request = {}, response = {};

  describe('When the service returns an array with the products', () => {
    before(() => {
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns([])
      sinon.stub(productsServices, 'getAll').resolves([])
    })

    after(() => {
      productsServices.getAll.restore()
    })
    it('res.status() with status 200', async () => {
      await productsControllers.getAll(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    })

    it('res.json() with array', async () => {
      await productsControllers.getAll(request, response)

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
      response.json = sinon.stub().returns({ message: 'Product not found' })
      sinon.stub(productsServices, 'getById').resolves([])
    })

    after(() => {
      productsServices.getById.restore()
    })

    it('res.status() with status 404', async () => {
      await productsControllers.getById(request, response)

      expect(response.status.calledWith(404)).to.be.equal(true)
    })

    it('res.json() with message "Product not found"', async () => {
      await productsControllers.getById(request, response)

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })

  })
  describe('If "id" exist return array', () => {
    before(() => {
      request.params = {id: 1}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({})
      sinon.stub(productsServices, 'getById').resolves([{}])
    })

    after(() => {
      productsServices.getById.restore()
    })

    it('res.status() with status 200', async () => {
      await productsControllers.getById(request, response)

      expect(response.status.calledWith(200)).to.be.equal(true)
    })

    it('res.json() return object', async () => {
      await productsControllers.getById(request, response)

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })
  })
})

describe('When called controller createProduct', () => {
  let request = {}, response = {};
  describe('Product name already exist', () => {
    before(() => {
      request.body = {name: 'Martelo de Thor', quantity: 20}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({ message: 'Product already exists' })
      sinon.stub(productsServices, 'getAll').resolves([{name: 'Martelo de Thor', quantity: 10}, {name: 'Manopla do Thanos', quantity: 5}])
    })

    after(() => {
      productsServices.getAll.restore()
    })

    it('res.status() with status 409', async () => {
      await productsControllers.createProduct(request, response) 

      expect(response.status.calledWith(409)).to.be.equal(true)
    })

    it('res.json() with message "Product already exists"', async () => {
      await productsControllers.createProduct(request, response) 

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })
  })
  describe('When the product is created', () => {
    before(() => {
      request.body = {name: 'Arco do Gavião', quantity: 3}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({id: 3, name: 'Arco do Gavião', quantity: 3})
      sinon.stub(productsServices, 'getAll').resolves([{name: 'Martelo de Thor', quantity: 10}, {name: 'Manopla do Thanos', quantity: 5}])
      sinon.stub(productsServices, 'createProduct').resolves({idCreated: 3})
    })

    after(() => {
      productsServices.getAll.restore()
      productsServices.createProduct.restore()
    })

    it('res.status() with status 201', async () => {
      await productsControllers.createProduct(request, response) 

      expect(response.status.calledWith(201)).to.be.equal(true)
    })

    it('res.json() receive object with properties', async () => {
      await productsControllers.createProduct(request, response) 

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
      expect(response.json()).to.have.property('id')
      expect(response.json()).to.have.property('name')
      expect(response.json()).to.have.property('quantity')
    })
  })
})

describe('When called controller updateProduct', () => {
  let request = {}, response = {};
  describe('When "id" doesnt exist', () => {
    before(() => {
      request.params = {id: 10}
      request.body = {name: 'Martelo de Thor', quantity: 20}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({ message: 'Product not found' })
      sinon.stub(productsServices, 'getById').resolves([])
    })

    after(() => {
      productsServices.getById.restore()
    })

    it('res.status() with status 404', async () => {
      await productsControllers.updateProduct(request, response) 

      expect(response.status.calledWith(404)).to.be.equal(true)
    })

    it('res.json() receive an object', async () => {
      await productsControllers.updateProduct(request, response) 

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })
  })
  describe('When the product is updated', () => {
    before(() => {
      request.params = {id: 1}
      request.body = {name: 'Martelo de Thor', quantity: 20}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({id: 1, name: 'Martelo de Thor', quantity: 20})
      sinon.stub(productsServices, 'getById').resolves([{name: 'Martelo de Thor', quantity: 10}])
      sinon.stub(productsServices, 'updateProduct').resolves('')
    })

    after(() => {
      productsServices.getById.restore()
      productsServices.updateProduct.restore()
    })

    it('res.status() with status 200', async () => {
      await productsControllers.updateProduct(request, response) 

      expect(response.status.calledWith(200)).to.be.equal(true)
    })

    it('res.json() receive an object', async () => {
      await productsControllers.updateProduct(request, response) 

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })
  })
})

describe('When called controller deleteProduct', () => {
  let request = {}, response = {};
  describe('When "id" doesnt exist', () => {
    before(() => {
      request.params = {id: 10}
      response.status = sinon.stub().returns(response)
      response.json = sinon.stub().returns({ message: 'Product not found' })
      sinon.stub(productsServices, 'getById').resolves([])
    })

    after(() => {
      productsServices.getById.restore()
    })

    it('res.status() with status 404', async () => {
      await productsControllers.deleteProduct(request, response) 

      expect(response.status.calledWith(404)).to.be.equal(true)
    })

    it('res.json() receive an object"', async () => {
      await productsControllers.deleteProduct(request, response) 

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true)
    })
  })
  describe('When the product is deleted', () => {
    before(() => {
      request.params = {id: 1}
      response.status = sinon.stub().returns(response)
      response.end = sinon.stub().returns()
      sinon.stub(productsServices, 'getById').resolves([{name: 'Martelo de Thor', quantity: 10}])
      sinon.stub(productsServices, 'deleteProduct').resolves('')
    })

    after(() => {
      productsServices.getById.restore()
      productsServices.deleteProduct.restore()
    })

    it('res.status() with status 204', async () => {
      await productsControllers.deleteProduct(request, response) 

      expect(response.status.calledWith(204)).to.be.equal(true)
    })

    it('res.end() is called', async () => {
      await productsControllers.deleteProduct(request, response) 

      expect(response.end.calledWith()).to.be.equal(true)
    })
  })
})