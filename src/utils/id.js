// src/utils/id.js
import { v4 as uuidv4 } from 'uuid';

export default function makeId(prefix = 't') {
  return `${prefix}_${uuidv4()}`;
}
