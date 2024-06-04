import { it, expect, describe } from 'vitest'
import { faker } from '@faker-js/faker'


describe('main', () => {
    it('should work', () => {
        console.log({
            name: faker.commerce.productName(),
            price: faker.commerce.price()
        })
    })
})