import tippy from 'tippy.js';
import type { Attachment } from 'svelte/attachments';

export function formatTemporal(instant: Temporal.Instant): string {
  if (!instant) return "";
  const now = Temporal.Now.zonedDateTimeISO()
  const ztd = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId())
  const time = `${String(ztd.hour).padStart(2,"0")}:${String(ztd.minute).padStart(2,"0")}`

  const isToday = now.year === ztd.year && now.dayOfYear === ztd.dayOfYear;
  const isYesterday = now.year === ztd.year && now.dayOfYear - 1 === ztd.dayOfYear; 
  if (isToday) {
    return `Today at ${time}`
  }
  if (isYesterday) {
    return `Yesterday at ${time}`
  }

  return `${ztd.year}/${ztd.month}/${ztd.day}`
}


export function tooltip(content: string): Attachment {
  return (element) => {
    const tooltip = tippy(element, { content });
    return tooltip.destroy;
  };
}