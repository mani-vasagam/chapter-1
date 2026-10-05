import type { ReactNode } from 'react';
import { getTbCapability, type TbCapabilityId } from '../../lib/tb-capabilities';

interface CapabilityBoundaryProps {
  capability: TbCapabilityId;
  children: ReactNode;
  className?: string;
}

export function CapabilityBoundary({ capability, children, className }: CapabilityBoundaryProps) {
  const config = getTbCapability(capability);
  if (config.enabled) return <>{children}</>;
  return (
    <section className={className} data-tb-capability={capability} data-tb-capability-status="setup-required" role="status">
      <h2>{config.setupMessage}</h2>
      <p>This feature is not active yet. Complete the required setup to enable it.</p>
    </section>
  );
}