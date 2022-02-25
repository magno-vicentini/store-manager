const sinon = require('sinon');
const { expect } = require('chai');


const salesServices = require('../../../services/salesServices');
const salesModels = require('../../../models/salesModels');

describe('When called service getAll', () => {
  it('returns an array with all objects', async () => {
    sinon.stub(salesModels, 'getAll').resolves([
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
    ])

    const result = await salesServices.getAll()
  
    expect(result).to.be.an('array')
    expect(result[0]).to.have.property('saleId')
    expect(result[0]).to.have.property('date')
    expect(result[0]).to.have.property('productId')
    expect(result[0]).to.have.property('quantity')
    
  })
})

describe('When called service getById',  () => {
  it('returns an array with objects', async () => {
    sinon.stub(salesModels, 'getById').resolves([
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
    ])
    
    const result = await salesServices.getById()

    expect(result).to.be.an('array')
    expect(result[0]).to.have.property('date')
    expect(result[0]).to.have.property('productId')
    expect(result[0]).to.have.property('quantity')
  })
})

describe('When called service createSale',  () => {
  it('returns an object with "id" and items sold', async () => {
    sinon.stub(salesModels, 'createSale').resolves({
      id: 1,
      itemsSold: [],
    })
    
    const result = await salesServices.createSale()

    expect(result).to.be.an('object')
    expect(result).to.have.property('id')
    expect(result).to.have.property('itemsSold')
  })
})

describe('When called service updateSale',  () => {
  it('returns an object with "saleId" and "itemUpdated"', async () => {
    sinon.stub(salesModels, 'updateSale').resolves({
      saleId: 1,
      itemUpdated: [],
    })
    
    const result = await salesServices.updateSale()

    expect(result).to.be.an('object')
    expect(result).to.have.property('saleId')
    expect(result).to.have.property('itemUpdated')
  })
})

describe('When called service deleteSale',  () => {
  it('execute the function and return nothing', async () => {
    sinon.stub(salesModels, 'deleteSale').resolves()
    
    const result = await salesServices.deleteSale()
  
    expect(result).to.be.equal(undefined)
  })
})