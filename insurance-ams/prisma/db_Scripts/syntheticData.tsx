import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { Stage, PolicyStatus, ClaimStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with synthetic data...");

  // Create 5 Insurance Companies
  const numInsurances = 1;
  const insurances = await Promise.all(
    Array.from({ length: numInsurances }).map(() =>
      prisma.insurance.create({
        data: {
          name: faker.company.name(),
          description: faker.lorem.sentence(),
        },
      })
    )
  );

  // Create 10 Clients and Assign Random Insurances (Many-to-Many)
  const numClients = 10;
  const clients = await Promise.all(
    Array.from({ length: numClients }).map(async () => {
      const newClient = await prisma.client.create({
        data: {
          Fname: faker.person.firstName(),
          Lname: faker.person.lastName(),
          DOB: faker.date.past({ years: 40 }),
          gender: faker.helpers.arrayElement(["Male", "Female", "Non-Binary"]),
          address: faker.location.streetAddress(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          dependants: faker.helpers.arrayElements(
            [faker.person.firstName(), faker.person.firstName()],
            2
          ),
          stage: faker.helpers.arrayElement([
            "LEAD",
            "CONSULT",
            "QUOTE",
            "CLOSED_ACCEPTED",
            "CLOSED_DENIED",
          ]),
          openClaims: faker.datatype.boolean(),
          insurances: {
            connect: faker.helpers.arrayElements(
              insurances.map((i) => ({ id: i.id })),
              faker.number.int({ min: 1, max: 3 }) // Each client gets 1-3 random insurances
            ),
          },
        },
      });
      return newClient;
    })
  );

  // Create 15 Policies and Assign to Clients & Insurances
  const numberOfPolicies = 15;
  const policies = await Promise.all(
    Array.from({ length: numberOfPolicies }).map(() => {
      const randomClient = faker.helpers.arrayElement(clients);
      const randomInsurance = faker.helpers.arrayElement(insurances);

      return prisma.policy.create({
        data: {
          policyNumber: faker.string.alphanumeric(10),
          startDate: faker.date.past({ years: 2 }),
          endDate: faker.date.future({ years: 1 }),
          premium: parseFloat(
            faker.finance.amount({ min: 100, max: 1000, dec: 2 })
          ),
          isActive: faker.datatype.boolean(),
          status: faker.helpers.arrayElement([
            PolicyStatus.PENDING_SIGNATURE,
            PolicyStatus.ACTIVE,
            PolicyStatus.CANCELLED,
          ]),

          clientId: randomClient.id,
          insuranceId: randomInsurance.id,
        },
      });
    })
  );

  // Create 20 Claims and Assign to Policies
  const numClaims = 20;
  const claims = await Promise.all(
    Array.from({ length: numClaims }).map(() => {
      const randomPolicy = faker.helpers.arrayElement(policies);

      return prisma.claim.create({
        data: {
          claimNumber: faker.string.alphanumeric(10),
          incidentDate: faker.date.recent({ days: 360 }),
          amount: parseFloat(
            faker.finance.amount({ min: 100, max: 1000, dec: 2 })
          ),
          atFault: faker.datatype.boolean(),
          status: faker.helpers.arrayElement([
            ClaimStatus.PENDING,
            ClaimStatus.APPROVED,
            ClaimStatus.REJECTED,
            ClaimStatus.IN_REVIEW,
            ClaimStatus.CLOSED,
          ]),
          policyId: randomPolicy.id,
        },
      });
    })
  );

  // // Create 2 agents and evenly assign clients that don't have agents yet
  // const numAgents = 2;
  // const agents = await Promise.all(
  //   Array.from({ length: numAgents }).map((_, index) => {
  //     const clientsPerAgent = Math.ceil(numClients / numAgents);
  //     const assignedClients = clients.slice(
  //       index * clientsPerAgent,
  //       (index + 1) * clientsPerAgent
  //     );

  //     return prisma.agent.create({
  //       data: {
  //         name: faker.person.firstName(),
  //         phone: faker.phone.number(),
  //         address: faker.location.streetAddress(),
  //         licenseNumber: faker.string.alphanumeric(10),
  //         clients: {
  //           connect: assignedClients.map((c) => ({ id: c.id })),
  //         },
  //       },
  //     });
  //   })
  // );

  console.log(`Created ${numInsurances} insurance companies.`);
  console.log(`Created ${numClients} clients.`);
  console.log(`Created ${numberOfPolicies} policies.`);
  console.log(`Created ${numClaims} claims.`);
  // console.log(`Created ${numAgents} agents.`);

  console.log("✅ Seeding completed! _ClientToInsurance table populated!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
