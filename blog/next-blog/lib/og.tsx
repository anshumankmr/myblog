import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { PERSON } from './identity';

export function ogImage(title: string, date?: string, profile = false) {
  const portrait = profile ? `data:image/jpeg;base64,${fs.readFileSync(path.join(process.cwd(), 'public', PERSON.image)).toString('base64')}` : undefined;
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffffff', color: '#16191d', width: '100%', height: '100%', padding: '64px' }}>
      <div style={{ display: 'flex', fontFamily: 'Plex Mono', fontSize: 20, color: '#555c66' }}>anshumankumar.net</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        {portrait && <img src={portrait} alt={`Portrait of ${PERSON.name}`} width={220} height={220} style={{ borderRadius: 110 }} />}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
          <div style={{ display: 'flex', fontFamily: 'Plex Serif', fontSize: 48, fontWeight: 500, lineHeight: 1.2 }}>{title}</div>
          {profile && <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'Plex Mono', fontSize: 24, color: '#555c66' }}>
            <span>{PERSON.jobTitle} · {PERSON.employer}</span>
            <span>{PERSON.city} · FinOps AI</span>
          </div>}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Plex Mono', fontSize: 20, color: '#555c66', borderTop: '1px solid #e4e8ec', paddingTop: '24px' }}>
        <span>{PERSON.name} · @{PERSON.handle}</span><span>{date || ''}</span>
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [
      { name: 'Plex Serif', data: fs.readFileSync(path.join(process.cwd(), 'assets/fonts/IBMPlexSerif-Medium.ttf')), weight: 500, style: 'normal' },
      { name: 'Plex Mono', data: fs.readFileSync(path.join(process.cwd(), 'assets/fonts/IBMPlexMono-Regular.ttf')), weight: 400, style: 'normal' },
    ] },
  );
}
