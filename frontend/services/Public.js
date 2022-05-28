import http from '@utils/axios';

export const MeshQuery = (keyword) =>
  http(`/api/mesh/${keyword}`, { method: 'POST' });

// export const Neo4jQuery = (limit, keyword) =>
//   http(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/search?limit=${limit}&keyword=${keyword}`,
//     { method: 'GET' },
//   );

export const EmbedQuery = (k, text) =>
  http(`${process.env.NEXT_PUBLIC_BACKEND_URL}/question?k=${k}&text=${text}`, {
    method: 'GET',
  });
