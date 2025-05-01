import { apiRequest } from "./queryClient";
import { ScanRequest } from "@shared/schema";

export async function submitScan(scanData: ScanRequest) {
  const res = await apiRequest("POST", "/api/scan", scanData);
  return await res.json();
}

export async function getScanStatus(scanId: number) {
  const res = await fetch(`/api/scan/${scanId}`, {
    credentials: "include",
  });
  
  if (!res.ok) {
    throw new Error(`Error fetching scan status: ${res.status}`);
  }
  
  return await res.json();
}

export function getSeverityColor(severity: string) {
  switch(severity.toLowerCase()) {
    case 'critical':
      return 'text-red-500 bg-red-500/20';
    case 'high':
      return 'text-orange-500 bg-orange-500/20';
    case 'medium':
      return 'text-yellow-500 bg-yellow-500/20';
    case 'low':
      return 'text-blue-500 bg-blue-500/20';
    case 'info':
      return 'text-gray-400 bg-gray-400/20';
    default:
      return 'text-gray-400 bg-gray-400/20';
  }
}

export function getScanStatusColor(status: string) {
  switch(status.toLowerCase()) {
    case 'completed':
      return 'text-green-500';
    case 'in_progress':
      return 'text-yellow-500';
    case 'pending':
      return 'text-blue-500';
    case 'failed':
      return 'text-red-500';
    default:
      return 'text-gray-400';
  }
}

export function formatDate(dateString: string) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}
