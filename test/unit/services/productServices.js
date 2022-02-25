const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../../services/productsServices');
const productsModels = require('../../../models/productsModels');

describe('When called service getAll', () => {
  it('returns an array with all objects', async () => {
    sinon.stub(productsModels, 'getAll').resolves([{}, {}])

    const result = await productsServices.getAll()
  
    expect(result).to.be.an('array')
  })
})

describe('When called service getById',  () => {
  it('returns an array with object', async () => {
    sinon.stub(productsModels, 'getById').resolves([{}])
    
    const result = await productsServices.getById()

    expect(result).to.be.an('array')
  })
})