import checks from '../public/js/checks.json';
import regions from '../public/js/regions.json';
import { Check, CheckState } from './models';
import { StorageService } from './storage.service';

// TODO: Either make this a service or make this more of a util file instead of a service
export function getChecks(map: string): CheckState[] {
  const $storage = StorageService.Instance;
  const subregion: string | null = map;
  const region = regions.find((r: any) => r.region === subregion);
  let subs: string[] = [];
  if (region != null) {
    subs = Object.keys(region.subregions);
  }
  return checks.filter(
    (c) =>
      c.subregion === subregion ||
      subs.some((s) => c.subregion == s)
  ).map((check: any) => new CheckState(
    new Check(check),
    $storage.saveData.checks[check.spoiler]
  ));
}
