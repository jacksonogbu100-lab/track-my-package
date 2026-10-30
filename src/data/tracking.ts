export type StepStatus = 'completed' | 'in_progress' | 'pending';

export type TrackingStep = {
  id: string;
  title: string;
  status: StepStatus;
  timestamp: string | null;
};

export type ShipmentInfo = {
  trackingNumber: string;
  carrier: string;
  origin: string;
  destination: string;
  service: string;
  weight: string;
  lastUpdated: string;
  overallStatus: 'In Transit' | 'Held' | 'Delivered';
  currentStepIndex: number;
  steps: TrackingStep[];
};

export const TRACKING_STEPS = [
  'Package shipped',
  'Ready for departure',
  'Arrived at the airport',
  'Being checked at customs',
  'Confiscated by customs',
] as const;

export function buildShipment(trackingNumber: string): ShipmentInfo {
  const currentStepIndex = 2; // Arrived at the airport — in progress

  const timestamps = [
    'Oct 21, 2026 10:30 AM',
    'Oct 22, 2026 02:15 PM',
    'Oct 24, 2026 08:20 AM',
    null,
    null,
  ];

  const steps: TrackingStep[] = TRACKING_STEPS.map((title, index) => {
    let status: StepStatus = 'pending';
    if (index < currentStepIndex) status = 'completed';
    else if (index === currentStepIndex) status = 'in_progress';

    return {
      id: `step-${index}`,
      title,
      status,
      timestamp: timestamps[index],
    };
  });

  return {
    trackingNumber: trackingNumber.trim().toUpperCase(),
    carrier: 'DHL Express',
    origin: 'Shanghai, CN',
    destination: 'New York, US',
    service: 'International Express',
    weight: '2.4 kg',
    lastUpdated: 'Oct 24, 2026 08:20 AM',
    overallStatus: 'In Transit',
    currentStepIndex,
    steps,
  };
}
