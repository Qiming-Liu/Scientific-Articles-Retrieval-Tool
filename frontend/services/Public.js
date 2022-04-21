import http from '../utils/axios';

// Users
export const MeshQuery = (keyword) =>
  http(`/api/mesh/${keyword}`, { method: 'POST' });
