import type { OpeningHours } from '../lib/hours';
import { OpenBadge } from './open-badge';
import { TimeZoneNote } from './time-zone-note';

export function HoursTable({
  hours,
  tone = 'light',
}: {
  hours: readonly OpeningHours[];
  tone?: 'light' | 'cobalt';
}) {
  const isCobalt = tone === 'cobalt';

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-2 rounded-ui border px-3 py-1 font-mono text-[0.74rem] ${
            isCobalt
              ? 'border-cobalt-rule bg-cobalt-band/40 text-cobalt-ink'
              : 'border-primary-ink/40 bg-porcelain text-primary-ink'
          }`}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-celadon" aria-hidden="true" />
          <OpenBadge hours={hours} />
        </span>
        <TimeZoneNote
          className={`font-mono text-[0.7rem] tracking-[0.06em] uppercase ${
            isCobalt ? 'text-cobalt-muted' : 'text-muted'
          }`}
        />
      </div>

      <table className="w-full border-collapse text-[0.9rem]">
        <caption className="sr-only">Clinic opening hours</caption>
        <tbody>
          {hours.map((entry) => (
            <tr
              key={entry.day}
              className={`border-b ${isCobalt ? 'border-cobalt-rule/75' : 'border-rule'}`}
            >
              <th
                scope="row"
                className={`py-2 text-left font-normal ${
                  isCobalt ? 'text-cobalt-muted' : 'text-muted'
                }`}
              >
                {entry.day}
              </th>
              <td
                className={`py-2 text-right font-mono text-[0.84rem] tabular-nums ${
                  isCobalt ? 'text-cobalt-ink' : 'text-ink'
                }`}
              >
                {entry.opens && entry.closes ? `${entry.opens}–${entry.closes}` : 'Closed'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
