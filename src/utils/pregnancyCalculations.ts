/**
 * Pregnancy Gestational Calculations (Naegele's Rule & Clinician Due Date)
 * Timezone-resilient calendar date calculations.
 */

export interface GestationalCalculationResult {
  currentWeek: number;
  currentDayInWeek: number;
  currentTrimester: 1 | 2 | 3;
  estimatedDueDate: string; // YYYY-MM-DD
  daysElapsed: number;
  daysRemaining: number;
  progressPercentage: number;
}

function parseDateAsUTC(dateInput: string | Date): Date {
  if (typeof dateInput === 'string') {
    const parts = dateInput.split('T')[0].split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(Date.UTC(year, month, day, 12, 0, 0));
  }
  return new Date(Date.UTC(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate(), 12, 0, 0));
}

function formatDateAsUTC(d: Date): string {
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates pregnancy progress from Last Menstrual Period (LMP) date.
 * Standard gestational length is 280 days (40 weeks).
 */
export function calculateFromLMP(
  lmpDateInput: string | Date,
  referenceDateInput: string | Date = new Date()
): GestationalCalculationResult {
  const lmpUtc = parseDateAsUTC(lmpDateInput);
  const nowUtc = parseDateAsUTC(referenceDateInput);

  // EDD = LMP + 280 days
  const eddUtc = new Date(lmpUtc.getTime() + 280 * 24 * 60 * 60 * 1000);

  const diffMs = nowUtc.getTime() - lmpUtc.getTime();
  const daysElapsed = Math.max(0, Math.floor(diffMs / (24 * 60 * 60 * 1000)));

  // Completed gestational weeks (e.g. 84 days = 12 weeks)
  const currentWeek = Math.min(42, Math.max(1, Math.floor(daysElapsed / 7)));
  const currentDayInWeek = (daysElapsed % 7);

  let currentTrimester: 1 | 2 | 3 = 1;
  if (currentWeek >= 28) {
    currentTrimester = 3;
  } else if (currentWeek >= 14) {
    currentTrimester = 2;
  } else {
    currentTrimester = 1;
  }

  const daysRemaining = Math.max(0, Math.ceil((eddUtc.getTime() - nowUtc.getTime()) / (24 * 60 * 60 * 1000)));
  const progressPercentage = Math.min(100, Math.max(0, Math.round((daysElapsed / 280) * 100)));

  return {
    currentWeek,
    currentDayInWeek,
    currentTrimester,
    estimatedDueDate: formatDateAsUTC(eddUtc),
    daysElapsed,
    daysRemaining,
    progressPercentage,
  };
}

/**
 * Calculates gestational age from a clinician-provided EDD.
 * LMP is inferred as EDD - 280 days.
 */
export function calculateFromEDD(
  eddDateInput: string | Date,
  referenceDateInput: string | Date = new Date()
): GestationalCalculationResult {
  const eddUtc = parseDateAsUTC(eddDateInput);
  const inferredLmpUtc = new Date(eddUtc.getTime() - 280 * 24 * 60 * 60 * 1000);
  return calculateFromLMP(inferredLmpUtc, referenceDateInput);
}
