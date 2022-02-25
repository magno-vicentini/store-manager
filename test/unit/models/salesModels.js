const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection')
const productsModels = require('../../../models/productsModels');
const salesModels = require('../../../models/salesModels');

describe('When called model getAll', () => {
  describe('When exist sales in database', () => {
    before(() => {
      const sales =   [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
      sinon.stub(connection, 'execute').resolves([sales, []])

    })
    after(() => {
      connection.execute.restore()
    })
    it('Return array with objects', async () => {
  
      const result = await salesModels.getAll()
      console.log(result)
  
      expect(result).to.be.an('array')
      expect(result[0]).to.have.property('saleId')
      expect(result[0]).to.have.property('date')
      expect(result[0]).to.have.property('productId')
      expect(result[0]).to.have.property('quantity')
    })

  })
  describe('When there is no sales in the database', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[], []])
    })
    after(() => {
      connection.execute.restore()
    })

    it('Return array empty', async () => {
  
      const result = await salesModels.getAll()
      console.log(result)
  
      expect(result).to.be.an('array')
      expect(result).to.be.empty
    })
  })
})

describe('When called model getById', () => {
  describe('When exist sales with "id"', () => {
    before(() => {
      const products = [
        {
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
      sinon.stub(connection, 'execute').resolves([products, []])

    })
    after(() => {
      connection.execute.restore()
    })
    it('Return array with an object', async () => {
  
      const result = await salesModels.getById()
  
      expect(result).to.be.an('array')
      expect(result[0]).to.have.property('date')
      expect(result[0]).to.have.property('productId')
      expect(result[0]).to.have.property('quantity')
    })

  })
  describe('When there is no sales with "id"', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[], []])
    })
    after(() => {
      connection.execute.restore()
    })

    it('Return array empty', async () => {
  
      const result = await salesModels.getById()
  
      expect(result).to.be.an('array')
      expect(result).to.be.empty
    })
  })
})

describe('When called model createProduct', () => {
  describe('When sales is created', () => {
    
    before(() => {
      sinon.stub(connection, 'execute').resolves([{insertId: 5}, []])
    })

    after(() => {
      connection.execute.restore()
      
    })
    it('Return insertId of product', async () => {
      const result = [
        {
          "productId": 1,
          "quantity": 2
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
      const resultCreate = await salesModels.createSale(result)

      expect(resultCreate).to.be.an('number')
      expect(resultCreate).to.be.equal(5)
    })
  })
})

describe('When called model updateSale', () => {
  describe('When sale is updated', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[], []])
    })

    after(() => {
      connection.execute.restore()
    })
    it('Return empty array', async () => {
      const arrayRequest = [
        {
          "productId": 1,
          "quantity": 6
        }
      ]
      const result = await salesModels.updateSale(1, arrayRequest)

      expect(result).to.be.an('array')
      expect(result).to.be.empty
    })
  })
})

describe('When called model deleteSale', () => {
  describe('When product is deleted', () => {
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
    it('Return array', async () => {

      const result = await salesModels.deleteSale()

      expect(result).to.be.an('array')
    })
  })
})