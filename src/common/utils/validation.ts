import * as ip from 'ip';
import * as net from 'net';

export const isValidIp = (address: string): boolean => {
  return net.isIP(address) !== 0 && !ip.isPrivate(address);
};
