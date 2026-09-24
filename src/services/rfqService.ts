import { RFQData, SubmissionResult } from '../types/rfq';

/**
 * RFQ Service
 *
 * Demo implementation: returns a mocked success result.
 *
 * Production implementation: replace the body of submitRFQ with a real
 * API call to a secure backend endpoint, e.g.:
 *
 *   const response = await fetch('/api/rfq/submit', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(rfqPayload),
 *   });
 *   return await response.json();
 *
 * The production endpoint would:
 * - Validate and store the RFQ
 * - Upload files to secure storage
 * - Send structured email notification to Evolve's sales team
 * - Optionally push to CRM / admin system
 * - Return the confirmed RFQ reference
 */

function generateRFQReference(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `EI-RFQ-2026-${num}`;
}

export async function submitRFQ(_data: RFQData): Promise<SubmissionResult> {
  // Simulate network latency for a realistic demo experience
  await new Promise((resolve) => setTimeout(resolve, 1800));

  // In production, this would be replaced with a real API call
  return {
    success: true,
    rfqReference: generateRFQReference(),
    submittedAt: new Date(),
  };
}
