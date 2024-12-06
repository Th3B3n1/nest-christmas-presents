import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
	for (let i = 0; i < 100; i++) {
		await prisma.toys.create({
			data: {
				name: faker.commerce.productName(),
				material: faker.helpers.arrayElement(["wood", "metal", "plastic", "other"]),
				weight: faker.number.float({ min: 1, max: 10 }),
			}
		});
	}
	for (let i = 0; i < 100; i++) {
		await prisma.children.create({
			include: {
				toys: true,
			},
			data: {
				name: faker.person.fullName(),
				address: faker.location.streetAddress(),
				well_behaved: faker.datatype.boolean(),
				toys: {
					connect: faker.helpers.arrayElements(
						await prisma.toys.findMany(),
						faker.number.int({ min: 1, max: 5 })
					),
				}
			}
		});
	}
}

seed()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	});