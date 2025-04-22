import { PrismaClient } from "@prisma/client";
// importing enums
import { Stage, PolicyStatus, ClaimStatus } from "@prisma/client";

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

async function main() {
  console.log("Dashboard Data Query...");

  const clients_quotesInProgress = await getQuotesInProgress();
  const clients_openClaims = await getOpenClaims();
  const policies_pendingToBind = await getPendingToBindPolicies(); // TODO
  const clients_leads = await getLeads();
  const policies_expiring60days = await getExpiringPolicies60days(60);
  const claims = await getClaims();
}

// Quotes in Progress - returns all clients with stage "QUOTE"
async function getQuotesInProgress() {
  const quotesInProgress = await prisma.client.findMany({
    where: {
      stage: "QUOTE",
    },
  });
  // console.log(quotesInProgress);
  console.log(`There are ${quotesInProgress.length} quotes in progress.`);
  return quotesInProgress;
}

// Open Claims - returns all clients with open claims
async function getOpenClaims() {
  const openClaims = await prisma.client.findMany({
    where: {
      openClaims: true,
    },
  });
  // console.log(openClaims);
  console.log(`There are ${openClaims.length} open claims.`);
  return openClaims;
}

// TODO: update synthetic data to include policies with status "PENDING_SIGNATURE"
// Pending to bind Policies - returns all policies with status "PENDING_SIGNATURE"
async function getPendingToBindPolicies() {
  const pendingToBindPolicies = await prisma.policy.findMany({
    where: {
      status: PolicyStatus.PENDING_SIGNATURE,
    },
  });
  // console.log(pendingToBindPolicies);
  console.log(
    `There are ${pendingToBindPolicies.length} policies pending to bind.`
  );
  return pendingToBindPolicies;
}

// Leads - returns all clients with stage "LEAD"
async function getLeads() {
  const leads = await prisma.client.findMany({
    where: {
      stage: Stage.LEAD,
    },
  });
  // console.log(leads);
  console.log(`There are ${leads.length} leads.`);
  return leads;
}

// Expiring policies in next numDays (non-renewing/ auto-renewing) - reutrn all policies with end date in the next numDays
async function getExpiringPolicies60days(numDays: number) {
  const expiringPolicies = await prisma.policy.findMany({
    where: {
      endDate: {
        lt: new Date(new Date().setDate(new Date().getDate() + numDays)),
      },
    },
  });
  // console.log(expiringPolicies);
  console.log(`There are ${expiringPolicies.length} expiring policies.`);
  return expiringPolicies;
}

// Claims
async function getClaims() {
  const claims = await prisma.claim.findMany({
    where: {
      status: {
        not: ClaimStatus.CLOSED,
      },
    },
  });
  // console.log(claims);
  console.log(`There are ${claims.length} claims.`);
  return claims;
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
