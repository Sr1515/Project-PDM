import { SupplierRepository } from "../repositories/implementations/SupplierRepository"
import { ProductRepository } from "../repositories/implementations/ProductRepository"
import { PersonRepository } from "../repositories/implementations/PersonRepository"
import { SupplyRepository } from "../repositories/implementations/SupplyRepository"

import { CreateSupplierUseCase } from "../useCases/CreateSupplier/createSupplierUseCase"
import { CreateProductUseCase } from "../useCases/CreateProduct/createProductUseCase"
import { CreatePersonUseCase } from "../useCases/CreatePerson/createPersonUseCase"
import { CreateSupplyUseCase } from "../useCases/CreateSupply/createSupplyUseCase"

import { DeleteProductUseCase } from "../useCases/DeleteProduct/deleteProductUseCase"
import { DeleteSupplierUseCase } from "../useCases/DeleteSupplier/deleteSupplierUseCase"
import { DeletePersonUseCase } from "../useCases/DeletePerson/deletePersonUseCase"
import { DeleteSupplyUseCase } from "../useCases/DeleteSupply/deleteSupplyUseCase"

import { UpdateProductUseCase } from "../useCases/UpdateProduct/updateProductUseCase"
import { UpdateSupplierUseCase } from "../useCases/UpdateSupplier/updateSupplierUseCase"
import { UpdatePersonUseCase } from "../useCases/UpdatePerson/updatePersonUseCase"
import { UpdateSupplyUseCase } from "../useCases/UpdateSupply/updateSupplyUseCase"

import { FindByIdProductUseCase } from "../useCases/FindByIdProduct/findByIdProductUseCase"
import { FindByIdSupplierUseCase } from "../useCases/FindByIdSupplier/findByIdSupplierUseCase"
import { FindByIdPersonUseCase } from "../useCases/FindByIdPerson/findByIdPersonUseCase"
import { FindByIdSupplyUseCase } from "../useCases/FindByIdSupply/findByIdSupplierUseCase"

import { FindAllProductsUseCase } from "../useCases/FindAllProduct/findAllProductsUsecase"
import { FindAllSuppliersUseCase } from "../useCases/FindAllSupplier/findAllSupplierUseCase"
import { FindAllPersonsUseCase } from "../useCases/FindAllPerson/findAllPersonUseCase"
import { FindAllSuppliesUseCase } from "../useCases/FindAllSupply/findAllSuppliesUseCase"

import {PostgreSqlContainer} from "@testcontainers/postgresql"
import { sequelizeInitURI } from "../database/connection"


describe("Unit tests with Use Cases without authentication", () => {
    jest.setTimeout(15000)
    let sequelize: any = null
    let container: any = null
    let supplierExemplo: any = null

    beforeEach(async () => {
        container = await new PostgreSqlContainer("postgis/postgis:latest").start()
        sequelize = sequelizeInitURI(container.getConnectionUri())
        await sequelize.sync({force: true})

        // create a mock supplier
        const supplierRepository = await new SupplierRepository(sequelize)
        const createSupplierUseCase = await new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Samuel",
            password: "1234"
        }

        supplierExemplo = await createSupplierUseCase.execute(supplier)
    })

    /// SupplierUseCases tests

    test("Deve criar um supplier", async () => {
        const supplierRepository = new SupplierRepository(sequelize)
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Gabriel",
            password: "654123"
        }

        expect(async () => {return await createSupplierUseCase.execute(supplier)}).not.toThrow()
    })

    test("Deve retornar todos os suppliers cadastrados", async () => {
        const supplierRepository = new SupplierRepository(sequelize)
        const findAllSupplierUseCase = new FindAllSuppliersUseCase(supplierRepository)
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Gabriel",
            password: "654123"
        }

        await createSupplierUseCase.execute(supplier)
        expect(async () => {return await findAllSupplierUseCase.execute()}).not.toThrow()
    })

    test("Deve retornar o supplier pelo id", async () => {
        const supplierRepository = new SupplierRepository(sequelize)
        const findByIdSupplierUseCase = new FindByIdSupplierUseCase(supplierRepository)
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Osvaldo",
            password: "654123"
        }

        let response: any = await createSupplierUseCase.execute(supplier)
        expect(async () => {return await findByIdSupplierUseCase.execute(response.dataValues.id)}).not.toThrow()
    })

    test("Deve atualizar um supplier cadastrado pelo id", async () => {
        const supplierRepository = new SupplierRepository(sequelize)
        const updateSupplierUseCase = new UpdateSupplierUseCase(supplierRepository)
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Osvaldo",
            password: "654123"
        }

        const updateSupplier: any = {
            name: "Osvaldo Code",
            password: "654123"
        }

        let response: any = await createSupplierUseCase.execute(supplier)
        expect(async () => {return await updateSupplierUseCase.execute(updateSupplier, response.dataValues.id)}).not.toThrow()
    })

    test("Deve deletar um supplier pelo id", async () => {
        const supplierRepository = new SupplierRepository(sequelize)
        const deleteSupplierUseCase =  new DeleteSupplierUseCase(supplierRepository)
        const createSupplierUseCase = new CreateSupplierUseCase(supplierRepository)

        const supplier: any = {
            name: "Osvaldo",
            password: "654123"
        }

        let response: any = await createSupplierUseCase.execute(supplier)
        expect(async () => {return await deleteSupplierUseCase.execute(response.dataValues.id)}).not.toThrow()
    })
        
    /// PersonUsesCases tests

    test("Deve criar um person", async () => {
        const personRepository = new PersonRepository(sequelize)
        const createPersonUseCase = new CreatePersonUseCase(personRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        expect(async () => {return await createPersonUseCase.execute(person)}).not.toThrow()
    })

    test("Deve retornar todos os person cadastrado", async () => {
        const personRepository = new PersonRepository(sequelize)
        const createPersonUseCase = new CreatePersonUseCase(personRepository)
        const findAllPersonUseCase = new FindAllPersonsUseCase(personRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        await createPersonUseCase.execute(person)
        expect(async () => {return await findAllPersonUseCase.execute()}).not.toThrow()
    })

    test("Deve retornar um person cadastrado pelo id", async () => {
        const personRepository = new PersonRepository(sequelize)
        const createPersonUseCase = new CreatePersonUseCase(personRepository)
        const findByIdPersonUseCase = new FindByIdPersonUseCase(personRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        let response: any = await createPersonUseCase.execute(person)
        expect(async () => {return await findByIdPersonUseCase.execute(response.dataValues.id)}).not.toThrow()
    })

    test("Deve atualizar um person cadastrado pelo id", async () => {
        const personRepository = new PersonRepository(sequelize)
        const createPersonUseCase = new CreatePersonUseCase(personRepository)
        const updatePersonUseCase = new UpdatePersonUseCase(personRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        const updatePerson: any = {
            name: "Gabriel Marcos",
            password: "654123",
            type: "CLT"
        }

        let response: any = await createPersonUseCase.execute(person)
        expect(async () => {return await updatePersonUseCase.execute(updatePerson, response.dataValues.id)}).not.toThrow()
    })

    test("Deve deletar um person cadastrado pelo id", async () => {
        const personRepository = new PersonRepository(sequelize)
        const createPersonUseCase = new CreatePersonUseCase(personRepository)
        const deletePersonUseCase = new DeletePersonUseCase(personRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        let response: any = await createPersonUseCase.execute(person)
        expect(async () => {return await deletePersonUseCase.execute(response.dataValues.id)}).not.toThrow()
    })

    /// ProductUsesCases tests

    test("Deve criar um produto", async () => {
        const productRepository = new ProductRepository(sequelize)
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        expect(async () => {return await createProductUseCase.execute(product)}).not.toThrow()
    })

    test("Deve retornar todos os produtos cadastrados", async () => {
        const productRepository = new ProductRepository(sequelize)
        const findAllProductsUseCase = new FindAllProductsUseCase(productRepository)
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        await createProductUseCase.execute(product)
        expect(async () => {return await findAllProductsUseCase.execute()}).not.toThrow()

    })

    test("Deve retornar um produto cadastrado pelo barcode", async () => {
        const productRepository = new ProductRepository(sequelize)
        const findByIdProductsUseCase = new FindByIdProductUseCase(productRepository)
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let response: any = await createProductUseCase.execute(product)
        expect(async () => {return await findByIdProductsUseCase.execute(response.dataValues.barcode)}).not.toThrow()

    })

    test("Deve atualizar um produto cadastrado pelo barcode", async () => {
        const productRepository = new ProductRepository(sequelize)
        const updateProductUseCase = new UpdateProductUseCase(productRepository)
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let response: any = await createProductUseCase.execute(product)

        const updateProduct = {
            name: "Gamepad",
            description: "Gamepad para PC.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 10,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }
        
        expect(async () => {return await updateProductUseCase.execute(updateProduct, response.dataValues.barcode, supplierExemplo.dataValues.id)}).not.toThrow()
    })

    test("Deve deletar um produto cadastrado pelo barcode", async () => {
        const productRepository = new ProductRepository(sequelize)
        const deleteProductUseCase = new DeleteProductUseCase(productRepository)
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let response: any = await createProductUseCase.execute(product)

        expect(async () => {return await deleteProductUseCase.execute(response.dataValues.barcode, supplierExemplo.dataValues.id)}).not.toThrow()
    })

    /// SupplyUsesCase tests 

    test("Deve criar um supply", async () => {
        const personRepository = new PersonRepository(sequelize)
        const createPersonUseCase = new CreatePersonUseCase(personRepository)

        const productRepository = new ProductRepository(sequelize)
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const supplyRepository = new SupplyRepository(sequelize)
        const createSupplyUseCase =  new CreateSupplyUseCase(supplyRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        let personResponse: any = await createPersonUseCase.execute(person)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let productResponse: any = await createProductUseCase.execute(product)

        const supply: any = {
            product_id: productResponse.dataValues.barcode,
            supplier_id: supplierExemplo.dataValues.id,
            person_id: personResponse.dataValues.id
        }

        expect(async () => {return await createSupplyUseCase.execute(supply)}).not.toThrow()
    })

    test("Deve retornar todos os supply cadastrado", async () => {
        const personRepository = new PersonRepository(sequelize)
        const createPersonUseCase = new CreatePersonUseCase(personRepository)

        const productRepository = new ProductRepository(sequelize)
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const supplyRepository = new SupplyRepository(sequelize)
        const createSupplyUseCase = new CreateSupplyUseCase(supplyRepository)
        const findAllSupplyUseCase = new FindAllSuppliesUseCase(supplyRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        let personResponse: any = await createPersonUseCase.execute(person)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let productResponse: any = await createProductUseCase.execute(product)

        const supply: any = {
            product_id: productResponse.dataValues.barcode,
            supplier_id: supplierExemplo.dataValues.id,
            person_id: personResponse.dataValues.id
        }

        await createSupplyUseCase.execute(supply)
        expect(async () => {return await findAllSupplyUseCase.execute()}).not.toThrow()
    })

    test("Deve retornar o supply cadastrado pelo id", async () => {
        const personRepository = new PersonRepository(sequelize)
        const createPersonUseCase = new CreatePersonUseCase(personRepository)

        const productRepository = new ProductRepository(sequelize)
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const supplyRepository = new SupplyRepository(sequelize)
        const createSupplyUseCase = new CreateSupplyUseCase(supplyRepository)
        const findByIdSupplyUseCase = new FindByIdSupplyUseCase(supplyRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        let personResponse: any = await createPersonUseCase.execute(person)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let productResponse: any = await createProductUseCase.execute(product)

        const supply: any = {
            product_id: productResponse.dataValues.barcode,
            supplier_id: supplierExemplo.dataValues.id,
            person_id: personResponse.dataValues.id
        }

        let response: any = await createSupplyUseCase.execute(supply)
        expect(async () => {return await findByIdSupplyUseCase.execute(response.dataValues.id)}).not.toThrow()
    })

    test("Deve atualizar o supply cadastrado pelo id", async () => {
        const personRepository = new PersonRepository(sequelize)
        const createPersonUseCase = new CreatePersonUseCase(personRepository)

        const productRepository = new ProductRepository(sequelize)
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const supplyRepository = new SupplyRepository(sequelize)
        const createSupplyUseCase = new CreateSupplyUseCase(supplyRepository)
        const updateSupplyUseCase = new UpdateSupplyUseCase(supplyRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }

        const newPerson: any = {
            name: "Osvaldo",
            password: "12345",
            type: "PJ"
        }

        let personMockOne: any = await createPersonUseCase.execute(person)
        let personMockTwo: any = await createPersonUseCase.execute(newPerson)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let productResponse: any = await createProductUseCase.execute(product)

        const supply: any = {
            product_id: productResponse.dataValues.barcode,
            supplier_id: supplierExemplo.dataValues.id,
            person_id: personMockOne.dataValues.id
        }

        const newSupply: any = {
            product_id: productResponse.dataValues.barcode,
            supplier_id: supplierExemplo.dataValues.id,
            person_id: personMockTwo.dataValues.id
        }

        let response: any = await createSupplyUseCase.execute(supply)
        expect(async () => {return await updateSupplyUseCase.execute(newSupply, response.dataValues.id)}).not.toThrow()
    })

    test("Deve deletar o supply cadastrado pelo id", async () => {
        const personRepository = new PersonRepository(sequelize)
        const createPersonUseCase = new CreatePersonUseCase(personRepository)

        const productRepository = new ProductRepository(sequelize)
        const createProductUseCase = new CreateProductUseCase(productRepository)

        const supplyRepository =  new SupplyRepository(sequelize)
        const createSupplyUseCase = new CreateSupplyUseCase(supplyRepository)
        const deleteSupplyUseCase = new DeleteSupplyUseCase(supplyRepository)

        const person: any = {
            name: "Gabriel",
            password: "654123",
            type: "PJ"
        }
        let personMock: any = await createPersonUseCase.execute(person)

        const product = {
            name: "Produto Exemplo",
            description: "Um produto de exemplo para teste.",
            price: 29.99,
            batch: "BATCH202409",
            manufacturing_date: "2024-01-15",
            expiration_date: "2025-01-15",
            ammount: 100,
            type: "Eletrônicos",
            supplier_id: supplierExemplo.dataValues.id
        }

        let productResponse: any = await createProductUseCase.execute(product)

        const supply: any = {
            product_id: productResponse.dataValues.barcode,
            supplier_id: supplierExemplo.dataValues.id,
            person_id: personMock.dataValues.id
        }

        let response: any = await createSupplyUseCase.execute(supply)
        expect(async () => {return await deleteSupplyUseCase.execute(response.dataValues.id)}).not.toThrow()
    })
})