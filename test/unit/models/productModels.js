const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection')
const productsModels = require('../../../models/productsModels');

describe('When called model getAll', () => {
  describe('When exist products in database', () => {
    before(() => {
      const products = [
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        }
      ]
      sinon.stub(connection, 'execute').resolves([products, []])

    })
    after(() => {
      connection.execute.restore()
    })
    it('Return array with objects', async () => {
  
      const result = await productsModels.getAll()
      console.log(result)
  
      expect(result).to.be.an('array')
      expect(result[0]).to.have.property('id')
      expect(result[0]).to.have.property('name')
      expect(result[0]).to.have.property('quantity')
    })

  })
  describe('When there is no product in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[], []])
    })
    after(() => {
      connection.execute.restore()
    })

    it('Return array empty', async () => {
  
      const result = await productsModels.getAll()
      console.log(result)
  
      expect(result).to.be.an('array')
      expect(result).to.be.empty
    })
  })
})

describe('When called model getById', () => {
  describe('When exist "id" in database', () => {
    before(() => {
      const products = [
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        }
      ]
      sinon.stub(connection, 'execute').resolves([products, []])

    })
    after(() => {
      connection.execute.restore()
    })
    it('Return array with an object', async () => {
  
      const result = await productsModels.getById()
  
      expect(result).to.be.an('array')
      expect(result[0]).to.have.property('id')
      expect(result[0]).to.have.property('name')
      expect(result[0]).to.have.property('quantity')
    })

  })
  describe('When there is no product with "id"', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[], []])
    })
    after(() => {
      connection.execute.restore()
    })

    it('Return array empty', async () => {
  
      const result = await productsModels.getById()
  
      expect(result).to.be.an('array')
      expect(result).to.be.empty
    })
  })
})

describe('When called model createProduct', () => {
  describe('When product is created', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([{insertId: 5}, []])
    })

    after(() => {
      connection.execute.restore()
    })
    it('Return insertId of product', async () => {

      const result = await productsModels.createProduct()

      expect(result).to.be.an('number')
      expect(result).to.be.equal(5)
    })
  })
})
describe('When called model updateProduct', () => {
  describe('When product is updated', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[], []])
    })

    after(() => {
      connection.execute.restore()
    })
    it('Return array empty', async () => {

      const result = await productsModels.updateProduct()

      expect(result).to.be.an('array')
      expect(result).to.be.empty
    })
  })
})

describe('When called model deleteProduct', () => {
  describe('When product is deleted', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves()
    })

    after(() => {
      connection.execute.restore()
    })
    it('Return undefined', async () => {

      const result = await productsModels.deleteProduct()

      expect(result).to.be.undefined
    })
  })
})