const sinon = require('sinon');
const { expect } = require('chai');


const productsServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');

describe('When called service getAll', () => {
  it('returns an array with all objects', async () => {
    sinon.stub(productsModels, 'getAll').resolves([
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
    ])

    const result = await productsServices.getAll()
  
    expect(result).to.be.an('array')
    expect(result[0]).to.have.property('id')
    expect(result[0]).to.have.property('name')
    expect(result[0]).to.have.property('quantity')
    
  })
})

describe('When called service getById',  () => {
  it('returns an object with properties', async () => {
    sinon.stub(productsModels, 'getById').resolves({
      "id": 1,
      "name": "produto A",
      "quantity": 10
    })
    
    const result = await productsServices.getById()

    expect(result).to.be.an('object')
    expect(result).to.have.property('id')
    expect(result).to.have.property('name')
    expect(result).to.have.property('quantity')
  })
})

describe('When called service createProduct',  () => {
  it('returns an insertId number', async () => {
    sinon.stub(productsModels, 'createProduct').resolves(4)
    
    const result = await productsServices.createProduct()

    expect(result).to.be.an('number')
  })
})

describe('When called service updateProduct',  () => {
  it('returns an array', async () => {
    sinon.stub(productsModels, 'updateProduct').resolves([])
    
    const result = await productsServices.updateProduct()

    expect(result).to.be.an('array')
  })
})

describe('When called service deleteProduct',  () => {
  it('returns an array', async () => {
    sinon.stub(productsModels, 'deleteProduct').resolves()
    
    const result = await productsServices.deleteProduct()
    console.log(result)
    expect(result).to.be.equal(undefined)
  })
})