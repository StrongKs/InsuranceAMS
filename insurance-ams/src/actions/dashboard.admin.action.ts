"use server";

import { PrismaClient } from "@prisma/client";
import { Stage, PolicyStatus, ClaimStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Quotes in Progress - returns all clients with stage "QUOTE"
export async function getQuotesInProgress(): Promise<
  { id: string; stage: string }[]
> {
  try {
    const quotesInProgress = await prisma.client.findMany({
      where: {
        stage: "QUOTE",
      },
    });
    // console.log(quotesInProgress);
    console.log(`There are ${quotesInProgress.length} quotes in progress.`);
    return quotesInProgress;
  } catch (error) {
    console.error(error);
    throw error; // Ensure errors are properly thrown
  }
}

// Open Claims - returns all clients with open claims
export async function getOpenClaims() {
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
export async function getPendingToBindPolicies() {
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
export async function getLeads() {
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
export async function getExpiringPolicies60days(numDays: number) {
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
export async function getClaims() {
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

// return all policies
export async function getPolicies() {
  const policies = await prisma.policy.findMany();
  console.log(`There are ${policies.length} policies.`);

  return policies;
}

export async function getActivePolicyData() {
  const policies = await getPolicies();
  const activePolicies = policies.filter(
    (policy) => policy.status === PolicyStatus.ACTIVE
  ).length;
  const nonActivePolicies = policies.filter(
    (policy) => policy.status !== PolicyStatus.ACTIVE
  ).length;
  const totalPolicies = policies.length;

  const data = [
    {
      name: "Active",
      total: activePolicies,
      fill: "#6BEFCF",
    },
    {
      name: "Non-Active",
      total: nonActivePolicies,
      fill: "#78CCF1",
    },
    {
      name: "Total",
      total: totalPolicies,
      fill: "white",
    },
  ];

  //   console.log("Active Policy Data: ");
  //   console.log(data);

  return data;
}

export async function getClientAtLeadStage() {
  const consults = await prisma.client.findMany({
    where: {
      stage: Stage.CONSULT,
    },
  });

  //   console.log("Client at Lead Stage Data: ");
  //   console.log(data);

  return consults;
}

export async function clientPiplineData() {
  const leads = await getLeads();
  const consults = await getClientAtLeadStage();
  const quotes = await getQuotesInProgress();
  const denied = await getOpenClaims();
  const accepted = await getPendingToBindPolicies();

  const data = [
    {
      name: "Lead",
      income: leads.length,
      fill: "#8884d8",
    },
    {
      name: "Consult",
      income: consults.length,
      fill: "#83a6ed",
    },
    {
      name: "Quote",
      income: quotes.length,
      fill: "#8dd1e1",
    },
    {
      name: "Denied",
      income: denied.length,
      fill: "#82ca9d",
    },
    {
      name: "Accepted",
      income: accepted.length,
      fill: "#4DB8A4",
    },
  ];

  //   console.log("Client Pipeline Data: ");
  //   console.log(data);

  return data;
}

// 1️⃣ Count Chart Data - Active vs Non-Active Policies
export async function getCountChartData() {
  const policies = await getPolicies();
  const activePolicies = policies.filter(
    (policy) => policy.status === PolicyStatus.ACTIVE
  ).length;
  const nonActivePolicies = policies.length - activePolicies;

  return [
    {
      name: "Active",
      total: activePolicies,
      fill: "#6BEFCF",
    },
    {
      name: "Non-Active",
      total: nonActivePolicies,
      fill: "#78CCF1",
    },
  ];
}

export async function getClientPipelineData() {
  const [leads, consults, quotes, denied, accepted] = await Promise.all([
    getLeads(),
    getClientAtLeadStage(),
    getQuotesInProgress(),
    getOpenClaims(),
    getPendingToBindPolicies(),
  ]);

  return [
    {
      name: "Lead",
      income: leads.length,
      fill: "#8884d8",
    },
    {
      name: "Consult",
      income: consults.length,
      fill: "#83a6ed",
    },
    {
      name: "Quote",
      income: quotes.length,
      fill: "#8dd1e1",
    },
    {
      name: "Denied",
      income: denied.length,
      fill: "#82ca9d",
    },
    {
      name: "Accepted",
      income: accepted.length,
      fill: "#4DB8A4",
    },
  ];
}

export async function getInsuredLineData() {
  // If you want to make this dynamic based on client.createdAt or policy.createdAt, let me know
  return [
    { name: "Jan", clients: 900 },
    { name: "Feb", clients: 1200 },
    { name: "Mar", clients: 1100 },
    { name: "Apr", clients: 1300 },
    { name: "May", clients: 1600 },
    { name: "Jun", clients: 1000 },
    { name: "Jul", clients: 1400 },
    { name: "Aug", clients: 1600 },
    { name: "Sep", clients: 1900 },
    { name: "Oct", clients: 2500 },
    { name: "Nov", clients: 2200 },
    { name: "Dec", clients: 2300 },
  ];
}
