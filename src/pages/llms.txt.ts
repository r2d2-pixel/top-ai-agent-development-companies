import { SITE, NICHE } from '../config';
import { companies } from '../data/companies';

export async function GET() {
  const sorted = [...companies].sort((a, b) => b.rating - a.rating);

  const lines: string[] = [];
  lines.push(`# ${SITE.name}`);
  lines.push('');
  lines.push(`> ${SITE.description}`);
  lines.push('');
  lines.push(`This site independently reviews ${companies.length} ${NICHE.label} ${NICHE.providersLabel}, ranked and compared by delivery track record, technical specificity, and engagement model transparency.`);
  lines.push('');
  lines.push('## Companies');
  lines.push('');
  for (const c of sorted) {
    lines.push(`- [${c.name}](${SITE.url}/companies/${c.slug}/): ${c.tagline} — rated ${c.rating.toFixed(1)}/5. Founded ${c.founded}, HQ ${c.hq}, team size ${c.teamSize}. Best for: ${c.bestFor}.`);
  }
  lines.push('');
  lines.push('## Pages');
  lines.push('');
  lines.push(`- [Homepage](${SITE.url}/): Full comparison table, pricing, FAQ, and selection methodology`);
  lines.push(`- [Affiliate Disclosure](${SITE.url}/affiliate-disclosure/)`);
  lines.push(`- [Contact](${SITE.url}/contact/)`);

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain' },
  });
}
