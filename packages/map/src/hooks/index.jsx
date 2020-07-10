import { useRef } from 'react';
import { getID } from '../utils';


export const useID = () => useRef(getID()).current;
