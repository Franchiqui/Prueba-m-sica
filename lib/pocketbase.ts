import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://zeus-basedatos-2.fly.dev');

export default pb;