"use server";

import { PrismaClient } from "@prisma/client";
import { Stage, PolicyStatus, ClaimStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Quotes in Progress - returns all clients with stage "QUOTE" for a specific agent
export async function getQuotesInProgress(agentId: string) {
  const quotesInProgress = await prisma.client.findMany({
    where: {
      stage: Stage.QUOTE,
      agentId: agentId,
    },
  });
  console.log(
    `Agent ${agentId} has ${quotesInProgress.length} quotes in progress.`
  );
  return quotesInProgress;
}

// Open Claims - returns all claims for clients assigned to a specific agent (via policy → client)
export async function getOpenClaims(agentId: string) {
  const openClaims = await prisma.claim.findMany({
    where: {
      status: {
        not: ClaimStatus.CLOSED,
      },
      policy: {
        client: {
          agentId: agentId,
        },
      },
    },
    include: {
      policy: {
        include: {
          client: true,
        },
      },
    },
  });

  console.log(`Agent ${agentId} has ${openClaims.length} open claims.`);
  return openClaims;
}

// Pending to bind Policies - returns all policies with status "PENDING_SIGNATURE" for clients of a specific agent
export async function getPendingToBindPolicies(agentId: string) {
  const pendingToBindPolicies = await prisma.policy.findMany({
    where: {
      status: PolicyStatus.PENDING_SIGNATURE,
      client: {
        agentId: agentId,
      },
    },
  });
  console.log(
    `Agent ${agentId} has ${pendingToBindPolicies.length} policies pending to bind.`
  );
  return pendingToBindPolicies;
}

// Leads - returns all clients with stage "LEAD" for a specific agent
export async function getLeads(agentId: string) {
  const leads = await prisma.client.findMany({
    where: {
      stage: Stage.LEAD,
      agentId: agentId,
    },
  });
  console.log(`Agent ${agentId} has ${leads.length} leads.`);
  return leads;
}

// Expiring policies in next numDays for a specific agent
export async function getExpiringPolicies60days(
  agentId: string,
  numDays: number
) {
  const expiringPolicies = await prisma.policy.findMany({
    where: {
      endDate: {
        lt: new Date(new Date().setDate(new Date().getDate() + numDays)),
      },
      client: {
        agentId: agentId,
      },
    },
  });
  console.log(
    `Agent ${agentId} has ${expiringPolicies.length} expiring policies.`
  );
  return expiringPolicies;
}

// Claims for a specific agent (not closed)
export async function getClaims(agentId: string) {
  const claims = await prisma.claim.findMany({
    where: {
      status: {
        not: ClaimStatus.CLOSED,
      },
      policy: {
        client: {
          agentId: agentId,
        },
      },
    },
    include: {
      policy: {
        include: {
          client: true,
        },
      },
    },
  });

  console.log(`Agent ${agentId} has ${claims.length} claims.`);
  return claims;
}

// Return all policies for clients of a specific agent
export async function getPolicies(agentId: string) {
  const policies = await prisma.policy.findMany({
    where: {
      client: {
        agentId: agentId,
      },
    },
  });
  console.log(`Agent ${agentId} has ${policies.length} policies.`);
  return policies;
}

// Active/Non-Active Policy Data for a specific agent
export async function getActivePolicyData(agentId: string) {
  const policies = await getPolicies(agentId);
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

  return data;
}

// Consult stage clients for a specific agent
export async function getClientAtLeadStage(agentId: string) {
  const consults = await prisma.client.findMany({
    where: {
      stage: Stage.CONSULT,
      agentId: agentId,
    },
  });
  return consults;
}

// Pipeline data for a specific agent (Lead, Consult, Quote, Denied, Accepted)
export async function getClientPipelineData(agentId: string) {
  const leads = await getLeads(agentId);
  const consults = await getClientAtLeadStage(agentId);
  const quotes = await getQuotesInProgress(agentId);
  const denied = await getOpenClaims(agentId);
  const accepted = await getPendingToBindPolicies(agentId);

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

  return data;
}

export async function getCountChartData(agentId: string) {
  const policies = await getPolicies(agentId);
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

export async function getInsuredLineData(agentId: string) {
  return [
    { name: "Jan", clients: 200 },
    { name: "Feb", clients: 300 },
    { name: "Mar", clients: 280 },
    { name: "Apr", clients: 310 },
    { name: "May", clients: 360 },
    { name: "Jun", clients: 250 },
    { name: "Jul", clients: 340 },
    { name: "Aug", clients: 360 },
    { name: "Sep", clients: 390 },
    { name: "Oct", clients: 450 },
    { name: "Nov", clients: 420 },
    { name: "Dec", clients: 430 },
  ];
}
