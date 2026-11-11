import React, { useState } from 'react';
import { VERIFIED_SOURCES } from '../data/sources';
import { ExternalLink, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface Props {
  sourceIds: string[];
}

export const SourcesList: React.FC<Props> = ({ sourceIds }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sources = sourceIds.map(id => VERIFIED_SOURCES[id]).filter(Boolean);

  if (sources.length === 0) return null;

  return (
    <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          color: 'var(--primary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          padding: '0.25rem 0'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <BookOpen size={16} /> Sources &amp; Further Educational Reading ({sources.length})
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sources.map(src => (
            <div key={src.id} style={{ background: 'var(--card-subtle)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.825rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>{src.title}</div>
              <div style={{ color: 'var(--text-muted)' }}>Publisher: {src.publisher}</div>
              <div style={{ margin: '0.25rem 0', color: 'var(--text)' }}>
                <strong>Concept:</strong> {src.concept}
              </div>
              <div style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>{src.notes}</div>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: 'var(--primary)',
                  marginTop: '0.4rem',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                Access Reference Documentation <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};