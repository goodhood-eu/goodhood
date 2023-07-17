import { useEffect, useState } from 'react';
import { Vendor } from './types';
import { subscribe } from './listener';

const useGrant = (vendor: Vendor): boolean => {
  const [granted, setGranted] = useState<boolean>(false);

  useEffect(() => subscribe(vendor, setGranted), [vendor]);

  return granted;
};

export default useGrant;
