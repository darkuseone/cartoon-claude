import { Composition } from 'remotion';
import { Ep01 } from './ep01/Ep01';
import timeline from '../public/ep01/timeline.json';

export const Root: React.FC = () => (
  <Composition
    id="Ep01"
    component={Ep01}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={Math.ceil(timeline.duration * 30)}
  />
);
