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
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const clientsByMonth = await prisma.client.findMany({
    where: {
      createdAt: {
        gte: oneYearAgo,
      },
      agentId: agentId, // Assuming clients table has an agentId field
    },
    select: {
      createdAt: true,
    },
  });

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (11 - i));
    const monthKey = month.toISOString().slice(0, 7); // Format as YYYY-MM
    const count = clientsByMonth.filter(
      (client) => client.createdAt.toISOString().slice(0, 7) === monthKey
    ).length;

    return {
      name: month.toLocaleString("default", { month: "short" }),
      clients: count,
    };
  });

  console.log(`Monthly Data for Agent ${agentId}: `, monthlyData);

  return monthlyData;
}
