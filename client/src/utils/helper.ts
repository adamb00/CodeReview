export const headers = (cookies: { [key: string]: string }) => {
   return { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${cookies.jwt}` };
};

export const excludedRoutes = ['/signup'];
